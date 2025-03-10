import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchOrders } from '../redux/features/OrdersDataSlice';

const useFetchOrdersPeriodically = (intervalDuration) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchOrders());
        }, intervalDuration);

        // Fetch immediately on mount
        dispatch(fetchOrders());

        return () => {
            clearInterval(interval);  // Cleanup interval on component unmount
        };
    }, [dispatch, intervalDuration]);
};

export default useFetchOrdersPeriodically;
