import './App.css';
import { SidebarRight } from '../components/sidebar-right';
import {
    SidebarInset,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger,
} from '../components/ui/sidebar';
import ImgContent from './ImgContent';
import { Waves } from 'lucide-react'; 

function App() {
    return (
        <SidebarProvider>
            {/* <SidebarLeft /> */}
            <SidebarInset>
                <header className='bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2'>
                    <div className='flex flex-1 items-center gap-2 px-3'>
                        <Waves />
                        <span className='flex-auto'>
                            just add a watermark to the image
                        </span>
                        <SidebarTrigger className='cursor-pointer' />
                    </div>
                </header>
                <div className='flex flex-1 flex-col p-4 pt-0'>
                    <div className='bg-muted mx-auto h-[100%] w-full rounded-xl flex items-center justify-center'>
                        <ImgContent />
                    </div>
                </div>
            </SidebarInset>
            <SidebarRight />
        </SidebarProvider>
    );
}

export default App;
