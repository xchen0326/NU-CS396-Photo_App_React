const NavBar = (profileUserName) =>{
    return (
        <div>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/api">API Docs</a>
                </li>
                <li>{profileUserName.profileUsername}</li>
                <li><a href="logout">Sign out</a></li>
            </ul>
        </div>
    )
}

export default NavBar;