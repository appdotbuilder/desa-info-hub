<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\OrganizationProfile
 *
 * @property int $id
 * @property string $name
 * @property string|null $vision
 * @property string|null $mission
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $address
 * @property string|null $description
 * @property string|null $logo_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile query()
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile whereLogoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile whereMission($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrganizationProfile whereVision($value)
 * @method static \Database\Factories\OrganizationProfileFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class OrganizationProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'vision',
        'mission',
        'email',
        'phone',
        'address',
        'description',
        'logo_path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}