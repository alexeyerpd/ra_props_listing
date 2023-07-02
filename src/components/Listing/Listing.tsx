import {cn} from 'utils/classname';

import './Listing.scss';

const listBlock = cn('item-list');
const itemBlock = cn('item');

interface ListingProps {
    items: ListItemProps[];
}

export function Listing({items}: ListingProps) {
    return (
        <div className={listBlock()}>
            {items.map((item) => (
                <ListItem key={item.listing_id} {...item} />
            ))}
        </div>
    );
}

export interface ListItemProps {
    listing_id: number;
    url: string;
    MainImage: {
        url_570xN: string;
    };
    title: string;
    currency_code: string;
    price: string;
    quantity: number;
}

function ListItem({url, MainImage, title, currency_code: currencyCode, price, quantity}: ListItemProps) {
    const img = MainImage?.url_570xN;
    return (
        <div className={itemBlock()}>
            <div className="item-image">
                <a href={url}>
                    <img className={itemBlock('img')} src={img} />
                </a>
            </div>
            <div className="item-details">
                <p className="item-title">{title?.length > 50 ? title?.slice(0, 51) + '...' : title}</p>
                <Currency currencyCode={currencyCode} price={price} />
                <p className={`item-quantity ${getClassNameByBalance(quantity)}`}>{quantity} left</p>
            </div>
        </div>
    );
}

interface CurrencyProps {
    currencyCode: string;
    price: string;
}

function Currency({currencyCode, price}: CurrencyProps) {
    if (!currencyCode || !price) {
        return null;
    }
    let text = `${price} ${currencyCode}`;
    if (currencyCode === 'USD') {
        text = `$${price}`;
    } else if (currencyCode === 'EUR') {
        text = `€${price}`;
    }
    return <p className="item-price">{text}</p>;
}

function getClassNameByBalance(quantity: number) {
    if (quantity <= 10) {
        return 'level-low';
    } else if (quantity <= 20) {
        return 'level-medium';
    } else {
        return 'level-high';
    }
}
