import React from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Props {
    organization: {
        id: number;
        name: string;
        vision: string | null;
        mission: string | null;
        email: string | null;
        phone: string | null;
        address: string | null;
        description: string | null;
    } | null;
    recentActivities: Array<{
        id: number;
        title: string;
        description: string | null;
        activity_date: string;
        location: string | null;
        status: string;
        creator_name: string;
    }>;
    recentMeetingMinutes: Array<{
        id: number;
        title: string;
        meeting_date: string;
        location: string | null;
        creator_name: string;
    }>;
    recentDocuments: Array<{
        id: number;
        title: string;
        description: string | null;
        category: string | null;
        file_type: string;
        download_count: number;
        uploader_name: string;
        created_at: string;
    }>;
    stats: {
        total_activities: number;
        upcoming_activities: number;
        published_meeting_minutes: number;
        public_documents: number;
    };
    [key: string]: unknown;
}

export default function Welcome({ organization, recentActivities, recentMeetingMinutes, recentDocuments, stats }: Props) {
    const { auth } = usePage<SharedData>().props;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            planned: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            ongoing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        };
        
        const statusLabels = {
            planned: 'Direncanakan',
            ongoing: 'Berlangsung',
            completed: 'Selesai',
            cancelled: 'Dibatalkan'
        };
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status as keyof typeof badges] || badges.planned}`}>
                {statusLabels[status as keyof typeof statusLabels] || status}
            </span>
        );
    };

    return (
        <>
            <Head title="Selamat Datang">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white shadow-sm dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">🏘️</span>
                                </div>
                                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {organization?.name || 'Organisasi Desa'}
                                </h1>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href={route('dashboard')}
                                            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Halo, {auth.user.name}!
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                🏘️ Sistem Informasi Desa
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-green-100">
                                Platform digital untuk transparansi dan partisipasi warga dalam pembangunan desa
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                                <div className="text-center">
                                    <div className="text-3xl font-bold">{stats.total_activities}</div>
                                    <div className="text-green-200">Total Kegiatan</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">{stats.upcoming_activities}</div>
                                    <div className="text-green-200">Kegiatan Mendatang</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">{stats.published_meeting_minutes}</div>
                                    <div className="text-green-200">Berita Acara</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold">{stats.public_documents}</div>
                                    <div className="text-green-200">Dokumen</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            ✨ Fitur Unggulan Sistem Kami
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Memudahkan akses informasi dan partisipasi warga dalam kegiatan desa
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Link href={route('organization.show')} className="group">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700 h-full">
                                <div className="text-4xl mb-4">📋</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                                    Profil Organisasi
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Informasi lengkap tentang visi, misi, dan kontak organisasi desa
                                </p>
                            </div>
                        </Link>

                        <Link href={route('activities.index')} className="group">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700 h-full">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                                    Manajemen Kegiatan
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Daftar lengkap kegiatan desa dengan dokumentasi foto dan laporan
                                </p>
                            </div>
                        </Link>

                        <Link href={route('meeting-minutes.index')} className="group">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700 h-full">
                                <div className="text-4xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                                    Berita Acara Rapat
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Arsip lengkap berita acara rapat untuk transparansi organisasi
                                </p>
                            </div>
                        </Link>

                        <Link href={route('documents.index')} className="group">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700 h-full">
                                <div className="text-4xl mb-4">📚</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                                    Arsip Dokumen
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Repository dokumen penting yang dapat diakses dan diunduh warga
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Content */}
                <div className="bg-gray-100 dark:bg-gray-800 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Activities */}
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        📅 Kegiatan Terbaru
                                    </h3>
                                    <Link 
                                        href={route('activities.index')}
                                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {recentActivities.slice(0, 3).map((activity) => (
                                        <Link
                                            key={activity.id}
                                            href={route('activities.show', activity.id)}
                                            className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                                                    {activity.title}
                                                </h4>
                                                {getStatusBadge(activity.status)}
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                📍 {activity.location || 'Lokasi belum ditentukan'} • {formatDate(activity.activity_date)}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Meeting Minutes */}
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        📋 Berita Acara Terbaru
                                    </h3>
                                    <Link 
                                        href={route('meeting-minutes.index')}
                                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {recentMeetingMinutes.slice(0, 3).map((minute) => (
                                        <Link
                                            key={minute.id}
                                            href={route('meeting-minutes.show', minute.id)}
                                            className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight mb-2">
                                                {minute.title}
                                            </h4>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                📅 {formatDate(minute.meeting_date)} • 👤 {minute.creator_name}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Documents */}
                            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        📄 Dokumen Terbaru
                                    </h3>
                                    <Link 
                                        href={route('documents.index')}
                                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {recentDocuments.slice(0, 3).map((doc) => (
                                        <Link
                                            key={doc.id}
                                            href={route('documents.show', doc.id)}
                                            className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                                                    {doc.title}
                                                </h4>
                                                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                                                    {doc.file_type.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                📂 {doc.category || 'Umum'} • ⬇️ {doc.download_count} unduhan
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-green-600 text-white py-16">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold mb-4">
                            🤝 Bergabunglah dengan Komunitas Digital Desa
                        </h2>
                        <p className="text-xl text-green-100 mb-8">
                            Akses informasi lengkap, berpartisipasi dalam kegiatan, dan berkontribusi untuk kemajuan desa
                        </p>
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    📝 Daftar Sekarang
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="border border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    🔐 Masuk ke Akun
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">{organization?.name || 'Organisasi Desa'}</h3>
                            {organization?.address && (
                                <p className="text-gray-400 text-sm mt-1">{organization.address}</p>
                            )}
                        </div>
                        <div className="flex justify-center space-x-6 text-sm text-gray-400">
                            {organization?.email && (
                                <span>📧 {organization.email}</span>
                            )}
                            {organization?.phone && (
                                <span>📱 {organization.phone}</span>
                            )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
                            © 2024 Sistem Informasi Desa. Dibuat dengan ❤️ untuk kemajuan desa.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}