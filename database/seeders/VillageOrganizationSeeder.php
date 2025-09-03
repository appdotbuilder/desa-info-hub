<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\ActivityDocument;
use App\Models\DocumentArchive;
use App\Models\MeetingMinute;
use App\Models\OrganizationProfile;
use App\Models\User;
use Illuminate\Database\Seeder;

class VillageOrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create organization profile
        OrganizationProfile::create([
            'name' => 'Organisasi Desa Sejahtera',
            'vision' => 'Menjadi organisasi desa yang mandiri, sejahtera, dan berkeadilan untuk seluruh warga desa.',
            'mission' => 'Memberdayakan masyarakat desa melalui program-program pembangunan yang berkelanjutan, meningkatkan kualitas hidup warga, dan menciptakan lingkungan yang harmonis.',
            'email' => 'info@desasejahtera.id',
            'phone' => '+62 812-3456-7890',
            'address' => 'Jl. Raya Desa No. 123, Kecamatan Sejahtera, Kabupaten Harmoni, Jawa Tengah 12345',
            'description' => 'Organisasi Desa Sejahtera adalah lembaga yang bergerak dalam bidang pemberdayaan masyarakat desa dengan fokus pada pengembangan ekonomi lokal, pendidikan, dan kesehatan masyarakat.',
        ]);

        // Create users with different roles
        $admin = User::factory()->admin()->create([
            'name' => 'Admin Desa',
            'email' => 'admin@desasejahtera.id',
        ]);

        $contentCreator = User::factory()->contentCreator()->create([
            'name' => 'Sekretaris Desa',
            'email' => 'sekretaris@desasejahtera.id',
        ]);

        $members = User::factory()->member()->count(5)->create();

        // Create activities
        $activities = Activity::factory()->count(8)->create([
            'created_by' => $admin->id,
        ]);

        $upcomingActivities = Activity::factory()->upcoming()->count(3)->create([
            'created_by' => $contentCreator->id,
        ]);

        $completedActivities = Activity::factory()->completed()->count(5)->create([
            'created_by' => $admin->id,
        ]);

        // Create activity documents
        foreach ($activities->take(3) as $activity) {
            ActivityDocument::factory()->photo()->count(2)->create([
                'activity_id' => $activity->id,
                'uploaded_by' => $admin->id,
            ]);
            
            ActivityDocument::factory()->report()->create([
                'activity_id' => $activity->id,
                'uploaded_by' => $contentCreator->id,
            ]);
        }

        // Create meeting minutes
        MeetingMinute::factory()->published()->count(6)->create([
            'created_by' => $contentCreator->id,
        ]);

        MeetingMinute::factory()->draft()->count(2)->create([
            'created_by' => $admin->id,
        ]);

        // Create document archives
        DocumentArchive::factory()->public()->count(8)->create([
            'uploaded_by' => $admin->id,
        ]);

        DocumentArchive::factory()->membersOnly()->count(5)->create([
            'uploaded_by' => $contentCreator->id,
        ]);

        DocumentArchive::factory()->adminOnly()->count(3)->create([
            'uploaded_by' => $admin->id,
        ]);
    }
}