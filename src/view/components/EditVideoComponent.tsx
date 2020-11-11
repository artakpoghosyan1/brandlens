import * as React from 'react'
import { css } from 'emotion'
import { colors } from '../constants/Colors'
import { BackIcon } from '../assets/icons/BackIcon'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { DoneIcon } from '../assets/icons/DoneIcon'
import { TrimComponent } from './TrimComponent'
import { PageContainerComponent } from './shared/PageContainerComponent'

interface IEditVideoComponentProps {}

const editWrapperCss = css`
    background-color: ${colors.codGray};
    padding: 30px 18px 23px;

    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
`

const editHeaderCss = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const editBodyCss = css`
    flex-grow: 1;
`

export const EditVideoComponent: React.FC<IEditVideoComponentProps> = React.memo((props) => {
    return (
        <PageContainerComponent className={editWrapperCss}>
            <header className={editHeaderCss}>
                <button className={clearButtonDefaultStylesCss}>
                    <BackIcon />
                </button>

                <button className={clearButtonDefaultStylesCss}>
                    <DoneIcon />
                </button>
            </header>

            <div className={editBodyCss}></div>

            <footer>
                <TrimComponent
                    frameImages={[
                        'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
                        'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
                        'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
                        'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
                        'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
                        'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
                        'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
                        'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
                        'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
                        'https://cdn.shopify.com/s/files/1/0088/7940/7219/products/179862.DKRS-2.jpg?v=1584474109',
                    ]}
                />
            </footer>
        </PageContainerComponent>
    )
})
