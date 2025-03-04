<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Article::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $v =$request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'thumbnailURL' => 'required|string',
            'mediaType' => 'required|string',
            'mediaURL' => 'required|string',
        ]);

        $newArticle = Article::create(['title' => $request->input('title'),
                        'content' => $request->input('content'),
                        'thumbnailURL' => $request->input('thumbnailURL'),
                        'mediaType' => $request->input('mediaType'),
                        'mediaURL' => $request->input('mediaURL'),
                        'leadStory' => $request->input('leadStory'),
        ]);
        $newArticle->update(['id' => $newArticle->id]);
        return response()->json($newArticle, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return $article;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $v =$request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'thumbnailURL' => 'required|string',
            'mediaType' => 'required|string',
            'mediaURL' => 'required|string',
        ]);

    $article->update([
        'title' => $request->input('title'),
        'content' => $request->input('content'),
        'thumbnailURL' => $request->input('thumbnailURL'),
        'mediaType' => $request->input('mediaType'),
        'mediaURL' => $request->input('mediaURL'),
        'leadStory' => $request->input('leadStory'),
    ]);
    return response()->json($article, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(null, 204);
    }
}
