import { Input } from '@/components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useActions, useStore } from '@/store';
import { LockOpen, Lock } from 'lucide-react';

const SizeForm = () => {
    const { width, height, isAspectLocked } = useStore();
    const actions = useActions();
    return (
        <>
            <Input
                placeholder='width'
                type='number'
                value={width}
                onChange={v =>
                    actions({
                        type: 'setWidthHeight',
                        payload: { width: parseInt(v.target.value) },
                    })
                }
            />
            X
            <Input
                placeholder='height'
                type='number'
                value={height}
                onChange={v =>
                    actions({
                        type: 'setWidthHeight',
                        payload: { height: parseInt(v.target.value) },
                    })
                }
            />
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
