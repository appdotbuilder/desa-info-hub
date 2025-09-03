import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface MeetingMinute {
    id: number;
    title: string;
    content: string;
    meeting_date: string;
    location: string | null;
    status: string;
    created_at: string;
    creator: {
        id: number;
        name: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    meetingMinutes: {
        data: MeetingMinute[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    filters: {
        status?: string;
        search?: string;
    };
    canManage: boolean;
    [key: string]: unknown;
}

export default function MeetingMinutesIndex({ meetingMinutes, canManage }: Props) {
    const { auth } = usePage<SharedData>().props;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
            published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            archived: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
        };
        
        const statusLabels = {
            draft: 'Draft',
            published: 'Dipublikasi',
            archived: 'Diarsipkan'
        };
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status as keyof typeof badges] || badges.published}`}>
                {statusLabels[status as keyof typeof statusLabels] || status}
            </span>
        );
    };

    return (
        <>
            <Head title="Berita Acara Rapat" />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white shadow-sm dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={route('home')}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                >
                                    ← Kembali ke Beranda
                                </Link>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            📋 Berita Acara Rapat
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Arsip lengkap berita acara rapat untuk transparansi organisasi
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-green-600">{meetingMinutes.meta?.total || 0}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Berita Acara</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-blue-600">
                                {meetingMinutes.data.filter(m => m.status === 'published').length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Dipublikasi</div>
                        </div>
                        {canManage && (
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="text-2xl font-bold text-gray-600">
                                    {meetingMinutes.data.filter(m => m.status === 'draft').length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Draft</div>
                            </div>
                        )}
                    </div>

                    {/* Meeting Minutes List */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                        {meetingMinutes.data.length > 0 ? (
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {meetingMinutes.data.map((minute) => (
                                    <Link
                                        key={minute.id}
                                        href={route('meeting-minutes.show', minute.id)}
                                        className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {minute.title}
                                                        </h3>
                                                        {getStatusBadge(minute.status)}
                                                    </div>
                                                    
                                                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                                        {minute.content.substring(0, 200)}...
                                                    </p>
                                                    
                                                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center">
                                                            📅 {formatDate(minute.meeting_date)}
                                                        </div>
                                                        {minute.location && (
                                                            <div className="flex items-center">
                                                                📍 {minute.location}
                                                            </div>
                                                        )}
                                                        <div className="flex items-center">
                                                            👤 {minute.creator.name}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="ml-4 flex-shrink-0">
                                                    <div className="text-gray-400">
                                                        →
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📋</div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    Belum ada berita acara
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Berita acara rapat akan ditampilkan di sini setelah dipublikasi.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {meetingMinutes.meta?.last_page > 1 && (
                        <div className="mt-8 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                {meetingMinutes.links?.map((link, index: number) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                                            link.active 
                                                ? 'bg-green-600 text-white' 
                                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}