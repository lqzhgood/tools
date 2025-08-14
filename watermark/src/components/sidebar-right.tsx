import * as React from 'react';
import { ExternalLink, LogOut, Plus } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import SliderForm from '@/page/SliderForm';

// This is sample data.
const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    calendars: [
        {
            name: 'My Calendars',
            items: ['Personal', 'Work', 'Family'],
        },
        {
            name: 'Favorites',
            items: ['Holidays', 'Birthdays'],
        },
        {
            name: 'Other',
            items: ['Travel', 'Reminders', 'Deadlines'],
        },
    ],
};

export function SidebarRight({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar
            // collapsible='none'
            // className='sticky top-0 hidden h-svh border-l lg:flex'
            side='right'
            {...props}
        >
            <SidebarHeader className='border-sidebar-border h-16 border-b'>
                <SidebarMenuButton
                    size='lg'
                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                    <Avatar className='h-8 w-8 rounded-full'>
                        <AvatarImage
                            src={
                                'https://avatars.githubusercontent.com/u/9134671?v=4'
                            }
                            alt={'lqzh'}
                        />
                        <AvatarFallback className='rounded-lg'>
                            CN
                        </AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-medium'>lqzh</span>
                        <span className='truncate text-xs'>say hi</span>
                    </div>
                    <ExternalLink className='ml-auto size-4' />
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <SliderForm />
            </SidebarContent>
            {/* <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Plus />
                            <span>New Calendar</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter> */}
        </Sidebar>
    );
}
