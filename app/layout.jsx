import '@styles/globals.css'
import Nav from '@components/Nav';
import Provier from '@components/Provider';

export const metadata = {
    title: 'promptify',
    description: 'Discover and share your favorite prompts',
}

const RootLayout = ({children}) => {
    return (
        <html lang='en'>
            <body>
                <Provier>
                    <div className="main">
                        <div className="gradient"/>
                    </div>
                    <main className="app">
                        <Nav/>
                        {children}
                    </main>
                </Provier>
            </body>
        </html>
    )
}

export default RootLayout
