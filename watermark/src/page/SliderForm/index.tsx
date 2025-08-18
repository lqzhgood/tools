import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    SidebarGroup,
    SidebarGroupContent,
    // SidebarGroupLabel,
    SidebarMenu,
    // SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';

import { fontFamilyOptions } from '@/lib/const';
import { useActions, useStore } from '@/store';
import { Download, Loader2Icon } from 'lucide-react';
import SizeForm from './SizeForm';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const SliderForm = () => {
    const {
        watermark,
        text,
        rotate,
        fontSize,
        fontFamily,
        color,
        rowSpacing,
        colSpacing,
        opacity,
    } = useStore();
    const actions = useActions();

    const [loading, setLoading] = useState(false);

    return (
        <>
            <SidebarGroup className='py-0'>
                {/* <SidebarGroupLabel className='group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm'>
                    画布配置
                    <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                </SidebarGroupLabel> */}

                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem className='mt-5'>
                            <div className='grid gap-3'>
                                <Label>画布配置</Label>
                                <div className='flex items-center gap-2'>
                                    <SizeForm />
                                </div>
                            </div>
                        </SidebarMenuItem>
                        <SidebarMenuItem className='mt-5'>
                            <div className='grid gap-3'>
                                <Label>水印文字</Label>
                                <Textarea
                                    value={text}
                                    onChange={e =>
                                        actions({
                                            type: 'setWater',
                                            payload: { text: e.target.value },
                                        })
                                    }
                                />
                            </div>
                        </SidebarMenuItem>
                        <SidebarMenuItem className='mt-5'>
                            <div className='grid gap-3'>
                                <Label>水印字体</Label>
                                <Select
                                    value={fontFamily}
                                    onValueChange={v => {
                                        actions({
                                            type: 'setWater',
                                            payload: {
                                                fontFamily: v,
                                            },
                                        });
                                    }}
                                >
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder='字体' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fontFamilyOptions.map(o => (
                                            <SelectItem
                                                value={o.value}
                                                key={o.value}
                                            >
                                                <span
                                                    style={{
                                                        fontFamily: o.value,
                                                    }}
                                                >
                                                    {' '}
                                                    {o.label}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </SidebarMenuItem>
                        <SidebarMenuItem className='mt-5'>
                            <div className='grid gap-3'>
                                <Label>字体大小</Label>
                                <Input
                                    placeholder='角度'
                                    type='number'
                                    value={fontSize}
                                    onChange={v =>
                                        actions({
                                            type: 'setWater',
                                            payload: {
                                                fontSize: parseInt(
                                                    v.target.value
                                                ),
                                            },
                                        })
                                    }
                                />
                            </div>
                        </SidebarMenuItem>
                        <SidebarMenuItem className='mt-5'>
                            <div className='grid gap-3'>
                                <Label>旋转角度</Label>
                                <Input
                                    placeholder='角度'
                                    type='number'
                                    value={rotate}
                                    onChange={v =>
                                        actions({
                                            type: 'setWater',
                                            payload: {
                                                rotate: parseInt(
                                                    v.target.value
                                                ),
                                            },
                                        })
                                    }
                                />
                            </div>
                        </SidebarMenuItem>
                        <SidebarMenuItem className='mt-5'>
                            <div className='grid gap-3'>
                                <Label>颜色</Label>
                                <div className='flex items-center gap-2'>
                                    <input
                                        type='color'
                                        value={color}
                                        onChange={v =>
                                            actions({
                                                type: 'setWater',
                                                payload: {
                                                    color: v.target.value,
                                                },
                                            })
                                        }
                                    />
                                    {color}
                                </div>
                            </div>
                        </SidebarMenuItem>
                        <SidebarMenuItem className='mt-5'>
                            <div className='grid gap-3'>
                                <Label>行间距</Label>
                                <div className='flex items-center gap-2'>
                                    {rowSpacing}
                                    <input
                                        className='flex-auto'
                                        type='range'
                                        id='spacing'
                                        min='1'
                                        max='2.5'
                                        step='0.1'
                                        value={rowSpacing}
                                        onChange={v =>
                                            actions({
                                                type: 'setWater',
                                                payload: {
                                                    rowSpacing: Number(
                                                        v.target.value
                                                    ),
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </SidebarMenuItem>
                        <SidebarMenuItem className='mt-5'>
                            <div className='grid gap-3'>
                                <Label>列间距</Label>
                                <div className='flex items-center gap-2'>
                                    {colSpacing}
                                    <input
                                        className='flex-auto'
                                        type='range'
                                        id='spacing'
                                        min='1'
                                        max='2.5'
                                        step='0.1'
                                        value={colSpacing}
                                        onChange={v =>
                                            actions({
                                                type: 'setWater',
                                                payload: {
                                                    colSpacing: Number(
                                                        v.target.value
                                                    ),
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </SidebarMenuItem>
                        <SidebarMenuItem className='mt-5'>
                            <div className='grid gap-3'>
                                <Label>透明的</Label>
                                <div className='flex items-center gap-2'>
                                    {opacity}
                                    <input
                                        className='flex-auto'
                                        type='range'
                                        id='spacing'
                                        min='0.1'
                                        max='1'
                                        step='0.1'
                                        value={opacity}
                                        onChange={v =>
                                            actions({
                                                type: 'setWater',
                                                payload: {
                                                    opacity: Number(
                                                        v.target.value
                                                    ),
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </SidebarMenuItem>
                        <SidebarMenuItem className='mt-5'>
                            <Button
                                className='w-full cursor-pointer'
                                disabled={!watermark || loading}
                                onClick={() => {
                                    setLoading(true);
                                    watermark!.asyncDown().finally(() => {
                                        setLoading(false);
                                    });
                                }}
                            >
                                {loading ? (
                                    <Loader2Icon className='animate-spin' />
                                ) : (
                                    <Download />
                                )}
                                保存
                            </Button>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator className='mx-0' />
        </>
    );
};

export default SliderForm;
// <SidebarMenuButton></SidebarMenuButton>;
