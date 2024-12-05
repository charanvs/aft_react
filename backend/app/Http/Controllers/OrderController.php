<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Judgement;
use App\Models\Registration;
use App\Models\InterimJudgement;
use DB;

class OrderController extends Controller
{
    public function viewOrders(Request $request)
    {
        $regno = $request->query('regno');
    
        if (!$regno) {
            return response()->json(['message' => 'regno parameter is required'], 400);
        }
    
        // Find the judgment based on regno
        $judgement = Judgement::where('regno', $regno)->first();
    
        if (!$judgement) {
            return response()->json(['message' => 'Judgment not found'], 404);
        }
    
        // Fetch disposed case details
        $disposed = DB::table('aft_disposedof')->where('regno', $regno)->first();
    
        if (!$disposed) {
            return response()->json(['message' => 'Disposed record not found'], 404);
        }
    
        // Fetch interim judgments
        $interimJudgements = DB::table('aft_interim_judgements')
            ->where('regid', $disposed->regid)
            ->get()
            ->map(function ($interim) use ($regno) {
                // Derive case type from the first two characters of regno
                $case_type = substr($regno, 0, 2);
                
                // Derive year and month name from dod (assumes dod is in dd-mm-yyyy format)
                $year = explode('-', $interim->dol)[2] ?? 'unknown';
                $month = explode('-', $interim->dol)[1] ?? 'unknown';
    
                $monthNames = [
                    "January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"
                ];
                $monthName = $monthNames[intval($month) - 1] ?? 'unknown';
    
                // Construct PDF URL
                $pdfUrl = "https://aftdelhi.nic.in/assets/disposed_cases/{$year}/{$monthName}/{$case_type}/{$interim->pdfname}";
    
                // Add PDF URL to each interim judgment
                $interim->pdf_url = $pdfUrl;
    
                return $interim;
            });
    
        return response()->json([
            'judgement' => $judgement,
            'disposed' => $disposed,
            'interim_judgements' => $interimJudgements,
        ]);
    }
    
    
    
    
}
