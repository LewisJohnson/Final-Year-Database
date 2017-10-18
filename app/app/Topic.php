<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    public function projects(){
        return $this->belongsToMany(Project::class, 'project_topics');
    }

    public static function getDatalist(){
        $topicNames = Topic::pluck('name');

        $rtnString = '<datalist id="topicsDataList">';
        foreach ($topicNames as $name) {
            $rtnString .= '<option value="'. $name.'">';
        }
        $rtnString .= '</datalist>';

        return $rtnString;
    }

    public static function returnValidName($name){
    	$name = str_replace(' ', '-', $name);
    	return $name;
    }

    public function getRouteKeyName(){
    	return 'name';
    }
}
