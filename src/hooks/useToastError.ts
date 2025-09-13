import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { showToast } from '@redux/slices/appSlice';
import { fontSizes } from '@constants/Fonts';
import { colors } from '@constants/Colors';
import { UseErrorToastOpts } from '@types';

export function useErrorToast({
    error,
    isError,
    title = 'Error',
    toastProps = {},
}: UseErrorToastOpts) {
    const dispatch = useDispatch();
    const shownRef = useRef<unknown>(null);

    useEffect(() => {
        if (!isError || !error || shownRef.current === error) {
            return;
        }
        shownRef.current = error;

        const msg = (error.error as string) ?? (error.message as string) ?? 'Something went wrong';

        dispatch(
            showToast({
                type: 'error',
                text1: title,
                text2: msg,
                topOffset: 70,
                text1Style: {
                    fontSize: fontSizes.md,
                    color: colors.semantic.error,
                },
                text2Style: {
                    fontSize: fontSizes.sm,
                    color: colors.text.primary,
                },
                ...toastProps,
            })
        );
    }, [error, isError, title, toastProps, dispatch]);
}