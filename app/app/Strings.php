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
			$s = Strings::where('key', '=', $key)->pluck('value')->first();
		} else{
			if($authMode == "ug"){
				$s = StringsUg::where('key', $key)->pluck('value')->first();
			} else if($authMode == "masters") {
				$s = StringsMasters::where('key', $key)->pluck('value')->first();
			}
		}

		if($s == null){
			// We don't want error messages if we are in production
			if(App::isLocal()){
				return "{# MISSING STRING \"".$key."\" #}";
			}
		}

		return $s;
	}
}