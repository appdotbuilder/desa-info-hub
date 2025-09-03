import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface Props {
    profile: {
        id: number;
        name: string;
        vision: string | null;
        mission: string | null;
        email: string | null;
        phone: string | null;
        address: string | null;
        description: string | null;
        logo_path: string | null;
    } | null;
    canEdit: boolean;
    [key: string]: unknown;
}

export default function OrganizationShow({ profile, canEdit }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Profil Organisasi" />
            
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
                                {canEdit && (
                                    <Link
                                        href={route('organization.edit')}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        ✏️ Edit Profil
                                    </Link>
                                )}
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
                    {profile ? (
                        <>
                            {/* Organization Header */}
                            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-white font-bold text-2xl">🏘️</span>
                                    </div>
                                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                        {profile.name}
                                    </h1>
                                    {profile.description && (
                                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                            {profile.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Vision & Mission */}
                            {(profile.vision || profile.mission) && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                    {profile.vision && (
                                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                                🎯 Visi
                                            </h2>
                                            <div className="prose dark:prose-invert max-w-none">
                                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                    {profile.vision}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {profile.mission && (
                                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                                🎪 Misi
                                            </h2>
                                            <div className="prose dark:prose-invert max-w-none">
                                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                                    {profile.mission}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Contact Information */}
                            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    📞 Informasi Kontak
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {profile.email && (
                                        <div className="flex items-start space-x-3">
                                            <div className="text-2xl">📧</div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                                                <a 
                                                    href={`mailto:${profile.email}`}
                                                    className="text-green-600 hover:text-green-700 font-medium"
                                                >
                                                    {profile.email}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {profile.phone && (
                                        <div className="flex items-start space-x-3">
                                            <div className="text-2xl">📱</div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">Telepon</h3>
                                                <a 
                                                    href={`tel:${profile.phone}`}
                                                    className="text-green-600 hover:text-green-700 font-medium"
                                                >
                                                    {profile.phone}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {profile.address && (
                                        <div className="flex items-start space-x-3 md:col-span-2">
                                            <div className="text-2xl">📍</div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">Alamat</h3>
                                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                    {profile.address}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    🔗 Tautan Cepat
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Link
                                        href={route('activities.index')}
                                        className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                    >
                                        <div className="text-2xl group-hover:scale-110 transition-transform">🎯</div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600">
                                                Kegiatan Desa
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Lihat semua kegiatan
                                            </p>
                                        </div>
                                    </Link>
                                    
                                    <Link
                                        href={route('meeting-minutes.index')}
                                        className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                    >
                                        <div className="text-2xl group-hover:scale-110 transition-transform">📋</div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600">
                                                Berita Acara
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Arsip rapat
                                            </p>
                                        </div>
                                    </Link>
                                    
                                    <Link
                                        href={route('documents.index')}
                                        className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                    >
                                        <div className="text-2xl group-hover:scale-110 transition-transform">📚</div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600">
                                                Dokumen
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Arsip dokumen
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                            <div className="text-6xl mb-4">🏘️</div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Profil Organisasi Belum Tersedia
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Profil organisasi belum diatur. Hubungi administrator untuk menambahkan informasi organisasi.
                            </p>
                            {canEdit && (
                                <Link
                                    href={route('organization.edit')}
                                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                                >
                                    ➕ Atur Profil Organisasi
                                </Link>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}