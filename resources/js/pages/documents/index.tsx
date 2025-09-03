import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface Document {
    id: number;
    title: string;
    description: string | null;
    filename: string;
    file_type: string;
    file_size: number;
    category: string | null;
    tags: string[] | null;
    visibility: string;
    download_count: number;
    created_at: string;
    uploader: {
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
    documents: {
        data: Document[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    categories: string[];
    filters: {
        category?: string;
        search?: string;
    };
    canManage: boolean;
    [key: string]: unknown;
}

export default function DocumentsIndex({ documents, categories, filters }: Props) {
    const { auth } = usePage<SharedData>().props;

    const formatFileSize = (bytes: number) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Byte';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getVisibilityBadge = (visibility: string) => {
        const badges = {
            public: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            members_only: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            admin_only: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        };
        
        const visibilityLabels = {
            public: 'Publik',
            members_only: 'Anggota',
            admin_only: 'Admin'
        };
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[visibility as keyof typeof badges] || badges.public}`}>
                {visibilityLabels[visibility as keyof typeof visibilityLabels] || visibility}
            </span>
        );
    };

    return (
        <>
            <Head title="Arsip Dokumen" />
            
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
                            📚 Arsip Dokumen
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Repository dokumen penting yang dapat diakses dan diunduh warga
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-indigo-600">{documents.meta?.total || 0}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Dokumen</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-green-600">
                                {documents.data.filter(d => d.visibility === 'public').length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Dokumen Publik</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Kategori</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-purple-600">
                                {documents.data.reduce((sum, doc) => sum + doc.download_count, 0)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Unduhan</div>
                        </div>
                    </div>

                    {/* Categories */}
                    {categories.length > 0 && (
                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href={route('documents.index')}
                                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                        !filters.category 
                                            ? 'bg-green-600 text-white' 
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                                    }`}
                                >
                                    Semua Kategori
                                </Link>
                                {categories.map((category) => (
                                    <Link
                                        key={category}
                                        href={route('documents.index', { category })}
                                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                            filters.category === category
                                                ? 'bg-green-600 text-white' 
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                                        }`}
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Documents Grid */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                        {documents.data.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                {documents.data.map((document) => (
                                    <Link
                                        key={document.id}
                                        href={route('documents.show', document.id)}
                                        className="block border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                                                    {document.title}
                                                </h3>
                                            </div>
                                            <div className="ml-2 flex-shrink-0">
                                                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                                                    {document.file_type.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {document.description && (
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                                {document.description}
                                            </p>
                                        )}
                                        
                                        <div className="flex items-center justify-between mb-2">
                                            {document.category && (
                                                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                                                    📂 {document.category}
                                                </span>
                                            )}
                                            {getVisibilityBadge(document.visibility)}
                                        </div>
                                        
                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center space-x-2">
                                                <span>📤 {document.uploader.name}</span>
                                                <span>•</span>
                                                <span>{formatFileSize(document.file_size)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span>⬇️ {document.download_count}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            📅 {formatDate(document.created_at)}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📚</div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    Belum ada dokumen
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Dokumen akan ditampilkan di sini setelah diunggah oleh pengurus.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {documents.meta?.last_page > 1 && (
                        <div className="mt-8 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                {documents.links?.map((link, index: number) => (
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