<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;

class Strings extends Model{
	public $timestamps = false;
	public $incrementing = false;
	protected $primaryKey = 'key';
	protected $guarded = ['key'];
	protected $casts = ['id' => 'string'];
	
	public static function getString($key, $authMode = null){
		if($authMode == null){
			return Strings::where('key', '=', $key)->pluck('value')->first();
		} else{
			if($authMode == "ug"){
				return StringsUg::where('key', $key)->pluck('value')->first();
			} else {
				return StringsMasters::where('key', $key)->first();
			}
		}
	}
}
