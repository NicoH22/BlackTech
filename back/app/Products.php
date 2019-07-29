<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Products extends Model implements HasMedia
{

    use HasMediaTrait;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'categories_id','sous_categories_id', 'password','name', 'description', 'characteristic','price','admin','count_visit','quantity','weight'
    ];
}
