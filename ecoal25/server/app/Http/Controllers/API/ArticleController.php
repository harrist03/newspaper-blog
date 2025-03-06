<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Article::all()->load('tags');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $v =$request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'mediaType' => 'required|string',
            'mediaURL' => 'nullable|file|mimes:jpg,png,mp4,mp3,pdf,wav|max:20480',
            "tags" => 'string'
        ]);

        if ($request->hasFile('mediaURL')) {
            $hashName = $request->file('mediaURL')->hashName();
            $request->file('mediaURL')->storeAs('public/images', $hashName);
            $fileURL = Storage::url('images/'.$hashName);
        }
        else {
            $fileURL = null;
        }


        $newArticle = Article::create(['title' => $request->input('title'),
                        'content' => $request->input('content'),
                        'thumbnailURL' => $fileURL,
                        'mediaType' => $request->input('mediaType'),
                        'mediaURL' => $fileURL,
                        'leadStory' => $request->input('leadStory'),
        ]);

        $tags = explode(",", $request->input("tags"));
        foreach($tags as $t)  {
            $t = trim($t);
            $tag = Tag::where("name", $t)->first();
            if($tag == false)
                $tag = Tag::create(["name" => $t]);
            $newArticle->tags()->attach($tag->id);
        }

        return response()->json($newArticle, 201);
        //    ->header('Access-Control-Allow-Origin', '*')
          //  ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
            //->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return $article->load('tags');
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

    public function search( $slugTag)
    {
        $tags = Tag::where('name', $slugTag)->get();
        if (count($tags) == 0)
            return [];
        $articles = $tags[0]->articles;
          return $articles;
    }

    public function searchText($search) {
        return Article::where('title', 'like', "%".$search."%")->get();
    }
}
