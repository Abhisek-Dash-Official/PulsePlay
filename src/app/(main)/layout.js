// TODO: Create/Import Header including TopBar and NavBar in /(main)/layout.js
// TODO: TopBar [logo, brandname, search bar, watchlist, user_avatar, user_logo]
// TODO: NavBar [home, hollywood, bollywood, series, genre, favourites]
// TODO: user_logo:onclick_dropdown{logo+name, watchlist, favourites, sign_out}])

export default function MainLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* TODO: Import Header Component here later */}

            <main className="flex-1">
                {children}
            </main>

            {/* TODO: Import Footer Component here later */}
        </div>
    );
}