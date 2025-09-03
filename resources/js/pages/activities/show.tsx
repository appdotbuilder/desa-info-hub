import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface Props {
    activity: {
        id: number;
        title: string;
        description: string | null;
        activity_date: string;
        location: string | null;
        status: string;
        created_at: string;
        updated_at: string;
        creator: {
            id: number;
            name: string;
        };
        documents: Array<{
            id: number;
            filename: string;
            file_type: string;
            document_type: string;
            description: string | null;
            uploader: {
                name: string;
            };
        }>;
    };
    [key: string]: unknown;
}

export default function ActivityShow({ activity }: Props) {
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
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badges[status as keyof typeof badges] || badges.planned}`}>
                {statusLabels[status as keyof typeof statusLabels] || status}
            </span>
        );
    };

    return (
        <>
            <Head title={activity.title} />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white shadow-sm dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={route('activities.index')}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                >
                                    ← Kembali ke Daftar Kegiatan
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
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Activity Header */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {activity.title}
                                </h1>
                                {getStatusBadge(activity.status)}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    📅 Tanggal & Waktu
                                </h3>
                                <p className="text-gray-900 dark:text-white">
                                    {formatDate(activity.activity_date)}
                                </p>
                            </div>
                            
                            {activity.location && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        📍 Lokasi
                                    </h3>
                                    <p className="text-gray-900 dark:text-white">
                                        {activity.location}
                                    </p>
                                </div>
                            )}
                            
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    👤 Dibuat oleh
                                </h3>
                                <p className="text-gray-900 dark:text-white">
                                    {activity.creator.name}
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    📎 Dokumen
                                </h3>
                                <p className="text-gray-900 dark:text-white">
                                    {activity.documents.length} dokumen terlampir
                                </p>
                            </div>
                        </div>
                        
                        {activity.description && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                    📝 Deskripsi
                                </h3>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {activity.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Documents */}
                    {activity.documents.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                📎 Dokumen Terlampir
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {activity.documents.map((document) => (
                                    <div
                                        key={document.id}
                                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {document.filename}
                                                </h3>
                                                {document.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                        {document.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                        {document.file_type.toUpperCase()}
                                                    </span>
                                                    <span>
                                                        📤 {document.uploader.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <button className="ml-2 text-green-600 hover:text-green-700 text-sm font-medium">
                                                Unduh
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}