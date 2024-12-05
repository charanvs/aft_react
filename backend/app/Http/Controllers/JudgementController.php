<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Judgement;

class JudgementController extends Controller
{
    public function index(Request $request)
    {
        $query = Judgement::query();
    
        if ($request->filled('regno')) {
            $query->where('regno', 'like', '%' . $request->regno . '%');
        }
        if ($request->filled('case_type')) {
            $query->where('case_type', 'like', '%' . $request->case_type . '%');
        }
        if ($request->filled('year')) {
            $query->where('year', $request->year); // Keep exact match for year
        }
        if ($request->filled('petitioner')) {
            $query->where('petitioner', 'like', '%' . $request->petitioner . '%');
        }
        if ($request->filled('respondent')) {
            $query->where('respondent', 'like', '%' . $request->respondent . '%');
        }
        if ($request->filled('padvocate')) {
            $query->where('padvocate', 'like', '%' . $request->padvocate . '%');
        }
        if ($request->filled('radvocate')) {
            $query->where('radvocate', 'like', '%' . $request->radvocate . '%');
        }
        if ($request->filled('subject')) {
            $query->where('subject', 'like', '%' . $request->subject . '%');
        }
    
        return response()->json($query->get());
    }
    


    // Fetch a specific judgment by regno
    public function show(Request $request)
    {
        $regno = $request->query('regno'); // Get the regno from query parameters
    
        if (!$regno) {
            return response()->json(['error' => 'Registration number is required'], 400);
        }
    
        // Fetch the first matching judgement
        $judgement = Judgement::where('regno', $regno)->first();
    
        if ($judgement) {
            return response()->json($judgement); // Return single object
        }
    
        return response()->json(['error' => 'Judgement not found'], 404);
    }
    
}
