import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { RootState } from '@redux/store';
import { hideToast } from '@redux/slices/appSlice';

export const ToastListener: React.FC = () => {
    const toast = useSelector((s: RootState) => s.app.toast);
    const dispatch = useDispatch();

    useEffect(() => {
        if (toast) {
            Toast.show(toast);
            dispatch(hideToast());
        }
    }, [toast, dispatch]);

    return null;
};
