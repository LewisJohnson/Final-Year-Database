<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    public $timestamps = false;
    protected $table = null;
    protected $primaryKey = 'id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    public static function getDatalist(){
        $topicNames = Topic::pluck('name');

        $rtnString = '<datalist id="topicsDataList">';
        foreach ($topicNames as $name) {
            $rtnString .= '<option value="'. $name.'">';
        }
        $rtnString .= '</datalist>';

        return $rtnString;
    }

    public function getUnsluggedName(){
        $name = str_replace("-", " ", $this->name);
        return $name;
    }

    public static function getSluggedName($name){
    	$name = str_slug($name, "-");
    	return $name;
    }

    public function getRouteKeyName(){
    	return 'name';
    }
}
