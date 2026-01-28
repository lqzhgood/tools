import { Input } from '@/components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useActions, useStore } from '@/store';
import { LockOpen, Lock } from 'lucide-react';
import EventWrap from './EventWrap';

const SizeForm = () => {
    const { width, height, isAspectLocked } = useStore();
    const actions = useActions();
    return (
        <>
            <EventWrap
                value={width}
                valuePath='target.value'
                onChange={v =>
                    actions({
                        type: 'setWidthHeight',
                        payload: { width: parseInt(v + '') },
                    })
                }
            >
                <Input placeholder='width' type='number' />
            </EventWrap>
            X
            <EventWrap
                value={height}
                valuePath='target.value'
                onChange={v =>
                    actions({
                        type: 'setWidthHeight',
                        payload: { height: parseInt(v + '') },
                    })
                }
            >
                <Input placeholder='height' type='number' />
            </EventWrap>
            <Tooltip>
                <TooltipTrigger>
                    <div
                        className='cursor-pointer'
                        onClick={() =>
                            actions({
                                type: 'toggleAspectLock',
                            })
                        }
                    >
                        {isAspectLocked ? <Lock /> : <LockOpen />}
                    </div>
                </TooltipTrigger>
                <TooltipContent>锁定宽高比</TooltipContent>
            </Tooltip>
        </>
    );
};

export default SizeForm;
