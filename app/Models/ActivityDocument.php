<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ActivityDocument
 *
 * @property int $id
 * @property int $activity_id
 * @property string $filename
 * @property string $file_path
 * @property string $file_type
 * @property int $file_size
 * @property string $document_type
 * @property string|null $description
 * @property int $uploaded_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Activity $activity
 * @property-read \App\Models\User $uploader
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument query()
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument whereActivityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument whereDocumentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument whereFileSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument whereFileType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument whereUploadedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument photos()
 * @method static \Illuminate\Database\Eloquent\Builder|ActivityDocument reports()
 * @method static \Database\Factories\ActivityDocumentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ActivityDocument extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'activity_id',
        'filename',
        'file_path',
        'file_type',
        'file_size',
        'document_type',
        'description',
        'uploaded_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'file_size' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the activity that owns this document.
     */
    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }

    /**
     * Get the user who uploaded this document.
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Scope a query to only include photos.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePhotos($query)
    {
        return $query->where('document_type', 'photo');
    }

    /**
     * Scope a query to only include reports.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeReports($query)
    {
        return $query->where('document_type', 'report');
    }
}