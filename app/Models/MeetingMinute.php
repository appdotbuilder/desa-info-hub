<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\MeetingMinute
 *
 * @property int $id
 * @property string $title
 * @property string $content
 * @property \Illuminate\Support\Carbon $meeting_date
 * @property string|null $location
 * @property array|null $attendees
 * @property string|null $file_path
 * @property string $status
 * @property int $created_by
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $creator
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute query()
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute whereAttendees($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute whereMeetingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute published()
 * @method static \Illuminate\Database\Eloquent\Builder|MeetingMinute draft()
 * @method static \Database\Factories\MeetingMinuteFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class MeetingMinute extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'content',
        'meeting_date',
        'location',
        'attendees',
        'file_path',
        'status',
        'created_by',
        'published_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'meeting_date' => 'datetime',
        'attendees' => 'array',
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who created this meeting minute.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Scope a query to only include published meeting minutes.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope a query to only include draft meeting minutes.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }
}