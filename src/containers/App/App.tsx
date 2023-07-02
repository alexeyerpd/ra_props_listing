import * as React from 'react';
import {Listing} from 'components/Listing/Listing';
import {cn} from 'utils/classname';

import data from './etsy.json';

import '../../styles/root.scss';
import './App.scss';

const block = cn('app');

export function App() {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        setItems(data as any);
    }, []);

    return (
        <div className={block()}>
            <Listing items={items} />
        </div>
    );
}
