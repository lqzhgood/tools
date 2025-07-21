import './App.css';
import { SidebarRight } from './components/sidebar-right';
import { Button } from './components/ui/button';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from './components/ui/sidebar';

function App() {
    return (
        <SidebarProvider>
            <SidebarInset>
                <header className='bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2'>
                    <div className='flex flex-1 items-center gap-2 px-3'>
                        Project Management & Task Tracking
                    </div>
                </header>
                <div className='flex flex-1 flex-col gap-4 p-4'>
                    <div className='bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl' />
                    <div className='bg-muted/50 mx-auto h-[100vh] w-full max-w-3xl rounded-xl' />
                </div>
            </SidebarInset>
            <SidebarRight />
        </SidebarProvider>
    );
}

export default App;
