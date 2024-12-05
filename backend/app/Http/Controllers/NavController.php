<?php

namespace App\Http\Controllers;

use App\Models\NavLink;

class NavController extends Controller
{
    public function index()
    {
        $navLinks = NavLink::whereNull('parent_id')
            ->with('children.children') // Fetch children recursively
            ->orderBy('order') // Sort by the 'order' column
            ->get();
    
        return response()->json($navLinks);
    }
    
    // Create a new navigation link
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'parent_id' => 'nullable|integer|exists:nav_links,id',
            'order' => 'required|integer',
        ]);

        $navLink = NavLink::create($data);
        return response()->json($navLink, 201);
    }

    // Update an existing navigation link
    public function update(Request $request, $id)
    {
        $navLink = NavLink::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'parent_id' => 'nullable|integer|exists:nav_links,id',
            'order' => 'required|integer',
        ]);

        $navLink->update($data);
        return response()->json($navLink);
    }

    // Delete a navigation link
    public function destroy($id)
    {
        $navLink = NavLink::findOrFail($id);
        $navLink->delete();
        return response()->json(['message' => 'Navigation link deleted successfully']);
    }
}
