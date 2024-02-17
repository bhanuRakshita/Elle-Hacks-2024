import MainNav from "./MainNav";

const Layout = ({children}) => {
    return (
        <>
        <MainNav/>
      
        {children}
        </>
    )
}

export default Layout;