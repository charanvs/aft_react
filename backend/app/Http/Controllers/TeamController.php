<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\Gallery;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // Fetch all teams
    public function index()
    {
        $teams = Team::all();
        return response()->json($teams, 200);
    }

    // Fetch a single team by ID
    public function show($id)
    {
        $team = Team::find($id);
        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }
        return response()->json($team, 200);
    }

    public function gallery()
    {
        $gallery = Gallery::all();
        return response()->json($gallery, 200);
    }

}
