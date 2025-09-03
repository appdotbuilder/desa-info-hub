<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\DocumentArchive
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string $filename
 * @property string $file_path
 * @property string $file_type
 * @property int $file_size
 * @property string|null $category
 * @property array|null $tags
 * @property string $visibility
 * @property int $uploaded_by
 * @property int $download_count
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $uploader
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive query()
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereDownloadCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereFileSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereFileType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereUploadedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive whereVisibility($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive publicVisible()
 * @method static \Illuminate\Database\Eloquent\Builder|DocumentArchive byCategory($category)
 * @method static \Database\Factories\DocumentArchiveFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DocumentArchive extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'filename',
        'file_path',
        'file_type',
        'file_size',
        'category',
        'tags',
        'visibility',
        'uploaded_by',
        'download_count',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tags' => 'array',
        'file_size' => 'integer',
        'download_count' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who uploaded this document.
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Scope a query to only include publicly visible documents.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublicVisible($query)
    {
        return $query->where('visibility', 'public');
    }

    /**
     * Scope a query to filter by category.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $category
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}