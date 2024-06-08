import '@styles/globals.css'
import Nav from '@components/nav';
import Provier from '@components/Provider';
export const metadata = {
    title: 'promptify',
    description: 'Discover and share your favorite prompts',
}

const RootLayout = ({children}) => {
    return (
        <html lang='en'>
            <body>
                <div className="main">
                    <div className="gradient"/>
                </div>
                <main className="app">
                    <Nav/>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout
