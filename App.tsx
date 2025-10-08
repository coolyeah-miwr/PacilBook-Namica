import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import PunyakuView from './components/PunyakuView';
import BookDetailView from './components/BookDetailView';
import PengaturanView from './components/PengaturanView';
import PrivacyPolicyView from './components/PrivacyPolicyView';
import BantuanView from './components/BantuanView';
import LoginView from './components/LoginView';
import SignUpView from './components/SignUpView';
import BagView from './components/BagView';
import FolderDetailView from './components/FolderDetailView';
import AddToBagModal from './components/AddToBagModal';
import ConfirmationModal from './components/ConfirmationModal';
import FilterResultsView from './components/FilterResultsView';
import { Book, User, View, FilterOptions, Notification, Folder } from './types';
import { LocalizationProvider, useLocalization } from './contexts/LocalizationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import CreateFolderModal from './components/CreateFolderModal';
// FIX: Import RakView component to resolve 'Cannot find name' error.
import RakView from './components/RakView';
import { supabase } from './lib/supabaseClient'; 

interface ScrapedBook { 
  title: string;
  url: string;
  cover_url: string;
}

const initialBooks: Book[] = [
  { id: '1', title: 'Pengolahan Citra Digital', author: 'Dr. Anita S.', coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Teknik dan algoritma fundamental untuk analisis dan manipulasi gambar digital.', year: 2022, field: 'Citra' },
  { id: '2', title: 'Visi Komputer Tingkat Lanjut', author: 'Prof. Budi R.', coverImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Membahas topik-topik canggih dalam visi komputer, termasuk deep learning.', year: 2022, field: 'Citra' },
  { id: '3', title: 'Dasar-Dasar Jaringan Komputer', author: 'Dr. Eko Prasetyo', coverImage: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Pengenalan komprehensif tentang konsep jaringan, protokol, dan arsitektur.', year: 2021, field: 'Jaringan' },
  { id: '4', title: 'Keamanan Jaringan Modern', author: 'Prof. Santoso', coverImage: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Menjelajahi ancaman siber terkini dan strategi pertahanan jaringan yang efektif.', year: 2023, field: 'Jaringan' },
  { id: '5', title: 'Pemrograman Sistem Tertanam', author: 'Dr. Bayu Perkasa', coverImage: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Panduan praktis untuk mengembangkan perangkat lunak pada sistem mikrokontroler.', year: 2020, field: 'Tertanam' },
  { id: '6', title: 'Machine Learning untuk Citra Medis', author: 'Dr. Indah P.', coverImage: 'https://images.pexels.com/photos/7948011/pexels-photo-7948011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Aplikasi machine learning untuk diagnosis dan analisis citra medis.', year: 2024, field: 'Citra' },
  { id: '7', title: 'Deep Learning untuk Pengenalan Wajah', author: 'Dr. Fajar M.', coverImage: 'https://images.pexels.com/photos/4255420/pexels-photo-4255420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Menerapkan jaringan saraf konvolusional untuk deteksi dan pengenalan wajah.', year: 2024, field: 'Citra' },
  { id: '8', title: 'Jaringan Nirkabel & Komputasi Bergerak', author: 'Prof. Anisa L.', coverImage: 'https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Membahas teknologi dan tantangan dalam jaringan nirkabel dan perangkat mobile.', year: 2022, field: 'Jaringan' },
  { id: '9', title: 'Sistem Real-Time Tertanam', author: 'Dr. Adi Nugroho', coverImage: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Desain dan implementasi sistem yang merespons event dalam batasan waktu yang ketat.', year: 2021, field: 'Tertanam' },
  { id: '10', title: 'Augmented Reality (AR) Fundamentals', author: 'Prof. Rina W.', coverImage: 'https://images.pexels.com/photos/5958019/pexels-photo-5958019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Membangun aplikasi yang menggabungkan dunia digital dengan dunia nyata.', year: 2024, field: 'Citra' },
  { id: '11', title: 'Internet of Things (IoT) & Jaringan Sensor', author: 'Dr. Citra D.', coverImage: 'https://images.pexels.com/photos/4218883/pexels-photo-4218883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Menghubungkan perangkat fisik ke internet dan mengelola data dari sensor.', year: 2023, field: 'Jaringan' },
  { id: '12', title: 'Arsitektur Mikrokontroler ARM', author: 'Dr. Budi H.', coverImage: 'https://images.pexels.com/photos/163073/raspberry-pi-computer-linux-163073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Pemahaman mendalam tentang arsitektur prosesor ARM untuk sistem tertanam.', year: 2022, field: 'Tertanam' },
  { id: '13', title: 'Pengenalan Kriptografi', author: 'Dr. Rini S.', coverImage: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Konsep dasar dan algoritma dalam kriptografi modern untuk keamanan data.', year: 2023, field: 'Jaringan' },
  { id: '14', title: 'Robotika dan Sistem Cerdas', author: 'Prof. Agus H.', coverImage: 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Prinsip desain, kontrol, dan aplikasi robot cerdas dalam industri dan kehidupan sehari-hari.', year: 2022, field: 'Tertanam' },
  { id: '15', title: 'Analisis Pola & Pengenalan Objek', author: 'Dr. Maya L.', coverImage: 'https://images.pexels.com/photos/7667733/pexels-photo-7667733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Teknik statistik dan machine learning untuk mengenali pola dan objek dalam data visual.', year: 2024, field: 'Citra' },
  { id: '16', title: 'Jaringan Komputer Lanjutan', author: 'Prof. Hendra K.', coverImage: 'https://images.pexels.com/photos/2089366/pexels-photo-2089366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Membahas topik lanjutan seperti SDN, NFV, dan jaringan optik.', year: 2023, field: 'Jaringan' },
  { id: '17', title: 'Sistem Operasi untuk Embedded Devices', author: 'Dr. Iwan P.', coverImage: 'https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Kustomisasi dan optimisasi sistem operasi untuk perangkat dengan sumber daya terbatas.', year: 2021, field: 'Tertanam' },
  { id: '18', title: 'Computer Vision for Autonomous Vehicles', author: 'Dr. Dian A.', coverImage: 'https://images.pexels.com/photos/14145958/pexels-photo-14145958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Aplikasi visi komputer untuk navigasi, deteksi objek, dan pemahaman lingkungan pada mobil otonom.', year: 2024, field: 'Citra' },
];

const initialUsers: User[] = [
    {
        name: 'Namica',
        email: 'nadilla.pacil@ui.ac.id',
        password: 'password123',
        phone: '6281323456879',
        nim: '2206123456',
        profilePicture: ''
    },
    {
        name: 'Miralya',
        email: 'miralya@gmail.com',
        password: 'passwordmira',
        phone: '6281234567890',
        nim: '2206111222',
        profilePicture: ''
    }
];

const initialFilterOptions: FilterOptions = {
  from: '',
  to: '',
  fields: { citra: false, jaringan: false, tertanam: false },
};

const AppContent: React.FC = () => {
  const { t } = useLocalization();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem('pacil-book-users');
      return stored ? JSON.parse(stored) : initialUsers;
    } catch {
      return initialUsers;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('pacil-book-currentUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!currentUser;

  const [scrapedBooks, setScrapedBooks] = useState<ScrapedBook[]>([]); 
  const [isSupabaseLoading, setIsSupabaseLoading] = useState(true); 

  useEffect(() => { 
    const fetchScrapedBooks = async () => {
      const { data, error } = await supabase
          .from('Buku') 
          .select('title, url, cover_url') // Ambil hanya kolom yang kita butuhkan
          .order('title', { ascending: true })
          .limit(20); // Batasi jumlah untuk performa

      if (error) {
          console.error('Error fetching scraped books:', error);
          // Kita tetap set loading false meskipun ada error
          setIsSupabaseLoading(false);
      } else if (data) {
          setScrapedBooks(data as ScrapedBook[]);
          setIsSupabaseLoading(false);
      }
    };
    if (isAuthenticated) { 
        fetchScrapedBooks();
    } else {
        setIsSupabaseLoading(false);
    }
  }, [isAuthenticated]); 
  
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [view, setView] = useState<View>('rak');
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initialFilterOptions);
  
  const [myBooks, setMyBooks] = useState<Book[]>(() => {
    try {
      const stored = localStorage.getItem('pacil-book-myBooks');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse myBooks from localStorage", error);
      return [];
    }
  });
  const [folders, setFolders] = useState<Folder[]>(() => {
    try {
      const stored = localStorage.getItem('pacil-book-folders');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse folders from localStorage", error);
      return [];
    }
  });
  const [isAddToBagModalOpen, setAddToBagModalOpen] = useState(false);
  const [bookToAdd, setBookToAdd] = useState<Book | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false);

  const [confirmation, setConfirmation] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
  } | null>(null);
  
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const stored = localStorage.getItem('pacil-book-notifications');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse notifications from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pacil-book-users', JSON.stringify(users));
    } catch (error) {
      console.error("Failed to save users to localStorage", error);
    }
  }, [users]);
  
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('pacil-book-currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('pacil-book-currentUser');
      }
    } catch (error) {
      console.error("Failed to save currentUser to localStorage", error);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('pacil-book-myBooks', JSON.stringify(myBooks));
    } catch (error) {
      console.error("Failed to save myBooks to localStorage", error);
    }
  }, [myBooks]);

  useEffect(() => {
    try {
      localStorage.setItem('pacil-book-folders', JSON.stringify(folders));
    } catch (error) {
      console.error("Failed to save folders to localStorage", error);
    }
  }, [folders]);
  
  useEffect(() => {
    try {
      localStorage.setItem('pacil-book-notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error("Failed to save notifications to localStorage", error);
    }
  }, [notifications]);
  
  const addNotification = (type: Notification['type'], message: string) => {
    const newNotification: Notification = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      message,
      timestamp: Date.now(),
      isRead: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  useEffect(() => {
    if (isAuthenticated) {
        try {
            const hasSeenNewBooksNotif = localStorage.getItem('pacil-book-new-books-notif-seen');
            if (!hasSeenNewBooksNotif) {
                addNotification('update', t('notif_new_books'));
                localStorage.setItem('pacil-book-new-books-notif-seen', 'true');
            }
        } catch (error) {
            console.error("Failed to manage new books notification flag", error);
        }
    }
  }, [isAuthenticated]);


  const recommendedBooks = useMemo(() => books.filter(b => Number(b.id) % 3 === 0), [books]);
  const newBooks = useMemo(() => books.filter(b => b.year >= 2023), [books]);
  const lastReadBooks = useMemo(() => books.filter(b => Number(b.id) % 4 === 0), [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const searchTermMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const { from, to, fields } = filterOptions;
      
      const isNumericRange = !isNaN(Number(from)) && !isNaN(Number(to));

      let rangeMatch = true;
      if (from && to) {
        if(isNumericRange) {
            rangeMatch = book.year >= Number(from) && book.year <= Number(to);
        } else {
            rangeMatch = book.title.toLowerCase() >= from.toLowerCase() && book.title.toLowerCase() <= to.toLowerCase();
        }
      }

      const selectedFields = Object.entries(fields)
        .filter(([, value]) => value)
        .map(([key]) => key);
      
      let fieldMatch = true;
      if (selectedFields.length > 0) {
        fieldMatch = !!book.field && selectedFields.includes(book.field.toLowerCase());
      }
      
      return searchTermMatch && rangeMatch && fieldMatch;
    });
  }, [books, searchTerm, filterOptions]);

  const isFilteringOrSearching = useMemo(() => {
    return searchTerm !== '' ||
           filterOptions.from !== '' ||
           filterOptions.to !== '' ||
           filterOptions.fields.citra ||
           filterOptions.fields.jaringan ||
           filterOptions.fields.tertanam;
  }, [searchTerm, filterOptions]);

  const handleLogin = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      addNotification('security', t('notif_login_success'));
      return true;
    }
    return false;
  };
  
  const handleSignUp = (newUser: Omit<User, 'profilePicture'>): { success: boolean, message?: string } => {
    if (users.some(u => u.email === newUser.email)) {
      return { success: false, message: t('signup_error_email_exists') };
    }
    const userToSave: User = { ...newUser, profilePicture: '' };
    setUsers(prev => [...prev, userToSave]);
    return { success: true };
  };

  const handleSignUpSuccess = () => setAuthView('login');
  
  const handleLogout = () => {
    setConfirmation({
        isOpen: true,
        title: t('dialog_logout_title'),
        message: t('dialog_logout_message'),
        confirmText: t('dialog_logout_confirm_text'),
        onConfirm: () => {
            setCurrentUser(null);
        }
    });
  };

  const handleSaveUser = (updatedUser: User) => {
    const updatedUsers = users.map(u => u.email === updatedUser.email ? { ...u, ...updatedUser } : u);
    setUsers(updatedUsers);
    if (currentUser && currentUser.email === updatedUser.email) {
      setCurrentUser(prev => prev ? { ...prev, ...updatedUser } : null);
    }
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setFilterOptions(initialFilterOptions);
  };

  const handleBackToRak = () => {
    setSelectedBook(null);
    setSelectedFolder(null);
    setView('rak');
    handleClearFilter();
  };

  const handleOpenAddToBagModal = (book: Book) => {
    setBookToAdd(book);
    setAddToBagModalOpen(true);
  };

  const handleCloseAddToBagModal = () => {
    setBookToAdd(null);
    setAddToBagModalOpen(false);
  };
  
  const handleCreateFolder = (folderName: string) => {
    const newFolder: Folder = {
        id: `folder-${Date.now()}`,
        name: folderName,
        books: bookToAdd ? [bookToAdd] : [],
    };
    setFolders(prev => [...prev, newFolder]);
    setCreateFolderModalOpen(false); // Close create folder modal
    
    if (bookToAdd) {
        addNotification('success', t('notif_add_to_bag_success').replace('{title}', bookToAdd.title).replace('{folder}', folderName));
        handleCloseAddToBagModal(); // Close add to bag modal
    } else {
        addNotification('success', t('notif_folder_created').replace('{folder}', folderName));
    }
  };

  const handleAddToFolder = (book: Book, folderId: string) => {
    const targetFolder = folders.find(f => f.id === folderId);
    if (!targetFolder) return;

    if (targetFolder.books.some(b => b.id === book.id)) {
      handleCloseAddToBagModal();
      return;
    }
    
    setConfirmation({
        isOpen: true,
        title: t('dialog_add_to_bag_title'),
        message: t('dialog_add_to_bag_message').replace('{title}', book.title).replace('{folder}', targetFolder.name),
        confirmText: t('dialog_add_to_bag_confirm_text'),
        onConfirm: () => {
            setFolders(prevFolders => prevFolders.map(folder => {
                if (folder.id === folderId) {
                    // Avoid adding duplicates
                    if (folder.books.find(b => b.id === book.id)) {
                        return folder;
                    }
                    return { ...folder, books: [...folder.books, book] };
                }
                return folder;
            }));
            addNotification('success', t('notif_add_to_bag_success').replace('{title}', book.title).replace('{folder}', targetFolder.name));
            handleCloseAddToBagModal();
        }
    });
  };
  
  const handleSelectFolder = (folder: Folder) => {
    setSelectedFolder(folder);
  };

  const handleDeleteFromFolder = (bookId: string, folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return;
    const book = folder.books.find(b => b.id === bookId);
    if (!book) return;

    setConfirmation({
        isOpen: true,
        title: t('dialog_delete_title'),
        message: t('dialog_delete_from_bag_message').replace('{title}', book.title),
        confirmText: t('dialog_delete_confirm_text'),
        onConfirm: () => {
            setFolders(prev => prev.map(f => {
              if (f.id === folderId) {
                const updatedBooks = f.books.filter(b => b.id !== bookId);
                return { ...f, books: updatedBooks };
              }
              return f;
            }));
        }
    });
  };

    const handleDeleteFolder = (folderId: string) => {
        const folder = folders.find(f => f.id === folderId);
        if (!folder) return;

        setConfirmation({
            isOpen: true,
            title: t('dialog_delete_folder_title'),
            message: t('dialog_delete_folder_message').replace('{folder}', folder.name),
            confirmText: t('dialog_delete_confirm_text'),
            onConfirm: () => {
                setFolders(prev => prev.filter(f => f.id !== folderId));
                setSelectedFolder(null); // Go back to bag view
            }
        });
    };

    const handleRenameFolder = (folderId: string, newName: string) => {
        setFolders(prev => prev.map(f => f.id === folderId ? { ...f, name: newName } : f));
    };

  const handleDownloadBook = (book: Book) => {
    if (myBooks.find(b => b.id === book.id)) {
      return; // Avoid showing confirmation for already downloaded books
    }
    setConfirmation({
      isOpen: true,
      title: t('dialog_download_title'),
      message: t('dialog_download_message').replace('{title}', book.title),
      confirmText: t('dialog_download_confirm_text'),
      onConfirm: () => {
        setMyBooks(prev => {
          if (prev.find(b => b.id === book.id)) {
            return prev; // Double check to avoid duplicates
          }
          addNotification('success', t('notif_download_success').replace('{title}', book.title));
          return [...prev, book];
        });
      },
    });
  };

  const handleDeleteBook = (bookId: string) => {
    const book = myBooks.find(b => b.id === bookId);
    if (!book) return;

    setConfirmation({
        isOpen: true,
        title: t('dialog_delete_title'),
        message: t('dialog_delete_message').replace('{title}', book.title),
        confirmText: t('dialog_delete_confirm_text'),
        onConfirm: () => {
            setMyBooks(currentBooks => currentBooks.filter(b => b.id !== bookId));
        },
    });
  };
  
  const handleSelectBook = (book: Book) => setSelectedBook(book);
  
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const renderContent = () => {
    if (selectedBook) {
      const isBookOwned = myBooks.some(b => b.id === selectedBook.id);
      return (
        <BookDetailView 
          book={selectedBook} 
          onBack={() => setSelectedBook(null)}
          isDownloaded={isBookOwned}
        />
      );
    }
    
    if (isFilteringOrSearching) {
      return <FilterResultsView books={filteredBooks} onClearFilter={handleBackToRak} onSelectBook={handleSelectBook} />;
    }

    switch (view) {
      case 'rak':
        return <RakView 
          recommendedBooks={recommendedBooks} 
          newBooks={newBooks} 
          lastReadBooks={lastReadBooks} 
          onSelectBook={handleSelectBook} 
          onAddToBag={handleOpenAddToBagModal}
          onDownload={handleDownloadBook}
        />;
      case 'punyaku':
        return <PunyakuView books={myBooks} onSelectBook={handleSelectBook} onDeleteBook={handleDeleteBook} />;
      case 'bag':
        if (selectedFolder) {
            return <FolderDetailView
              folder={selectedFolder}
              onBack={() => setSelectedFolder(null)}
              onSelectBook={handleSelectBook}
              onDeleteBookFromFolder={handleDeleteFromFolder}
              onDeleteFolder={handleDeleteFolder}
              onRenameFolder={handleRenameFolder}
            />;
        }
        return <BagView 
                    folders={folders} 
                    onSelectFolder={handleSelectFolder} 
                    onCreateFolder={() => setCreateFolderModalOpen(true)}
                />;
      case 'pengaturan':
        return currentUser ? (
          <PengaturanView 
            user={currentUser} 
            onSaveUser={handleSaveUser} 
            onNavigateToPrivacy={() => setView('privasi')}
            setConfirmation={setConfirmation} 
          />
        ) : null;
      case 'privasi':
        return <PrivacyPolicyView onBack={() => setView('pengaturan')} />;
      case 'bantuan':
        return <BantuanView onBack={() => setView('rak')} />;
      default:
        return <RakView 
          recommendedBooks={recommendedBooks} 
          newBooks={newBooks} 
          lastReadBooks={lastReadBooks} 
          onSelectBook={handleSelectBook}
          onAddToBag={handleOpenAddToBagModal}
          onDownload={handleDownloadBook}
        />;
    }
  };
  
  if (!isAuthenticated) {
    return authView === 'login' 
      ? <LoginView onLogin={handleLogin} onSwitchToSignUp={() => setAuthView('signup')} />
      : <SignUpView onSignUp={handleSignUp} onSignUpSuccess={handleSignUpSuccess} onSwitchToLogin={() => setAuthView('login')} />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      <Header 
        isMenuOpen={isMenuOpen} 
        setMenuOpen={setMenuOpen} 
        view={view}
        setView={setView}
        onLogout={handleLogout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        notifications={notifications}
        onMarkNotificationAsRead={handleMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
        onClearAllNotifications={handleClearAllNotifications}
      />
      <main className="pt-4">
        {renderContent()}
      </main>
      {isAddToBagModalOpen && bookToAdd && (
        <AddToBagModal
          book={bookToAdd}
          folders={folders}
          onClose={handleCloseAddToBagModal}
          onAddToFolder={handleAddToFolder}
          onCreateFolder={() => {
            setAddToBagModalOpen(false);
            setCreateFolderModalOpen(true);
          }}
        />
      )}
      {isCreateFolderModalOpen && (
          <CreateFolderModal
            onClose={() => {
              setCreateFolderModalOpen(false);
              // If we were in the middle of adding a book, re-open that modal
              if(bookToAdd) setAddToBagModalOpen(true);
            }}
            onCreate={handleCreateFolder}
          />
      )}
      {confirmation?.isOpen && (
        <ConfirmationModal
          isOpen={confirmation.isOpen}
          onClose={() => setConfirmation(null)}
          onConfirm={confirmation.onConfirm}
          title={confirmation.title}
          message={confirmation.message}
          confirmText={confirmation.confirmText}
        />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <LocalizationProvider>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  </LocalizationProvider>
);

export default App;
