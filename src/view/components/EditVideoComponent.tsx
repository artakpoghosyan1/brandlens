import * as React from 'react'
import { css } from 'emotion'
import { colors } from '../constants/Colors'
import { BackIcon } from '../assets/icons/BackIcon'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { DoneIcon } from '../assets/icons/DoneIcon'
import { TrimComponent } from './TrimComponent'
import { PageComponent } from './shared/PageComponent'
import { PageHeaderComponent } from './shared/PageHeaderComponent'

const editWrapperCss = css`
    background-color: ${colors.codGray};
    padding: 30px 18px 23px;

    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
`

const editBodyCss = css`
    flex-grow: 1;
`

export const EditVideoComponent: React.FC = React.memo(() => {
    return (
        <PageComponent className={editWrapperCss}>
            <PageHeaderComponent>
                <button className={clearButtonDefaultStylesCss}>
                    <DoneIcon />
                </button>

                <button className={clearButtonDefaultStylesCss}>
                    <BackIcon />
                </button>
            </PageHeaderComponent>

            <div className={editBodyCss} />

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
        </PageComponent>
    )
})
