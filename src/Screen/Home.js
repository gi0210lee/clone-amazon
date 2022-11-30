import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return (
        <div className='home'>
            <div className='home_container'>
                <img className='home_image' src='https://m.media-amazon.com/images/I/51DNXJGrnrL._SX1500_.jpg' alt='' />

                <div className='home_row'>
                    {/* 상품 */}
                    <Product
                        id={Date.parse(new Date())}
                        title={'제품1'}
                        price={1000}
                        image={`https://picsum.photos/id/${Math.floor(Math.random() * 101)}/300/300`}
                        rating={Math.floor(Math.random() * 5 + 1)}
                    />
                    <Product
                        id={Date.parse(new Date())}
                        title={'제품2'}
                        price={1000}
                        image={`https://picsum.photos/id/${Math.floor(Math.random() * 101)}/300/300`}
                        rating={Math.floor(Math.random() * 5 + 1)}
                    />
                </div>
                <div className='home_row'>
                    {/* 상품 */}
                    <Product
                        id={Date.parse(new Date())}
                        title={'제품3'}
                        price={1000}
                        image={`https://picsum.photos/id/${Math.floor(Math.random() * 101)}/300/300`}
                        rating={Math.floor(Math.random() * 5 + 1)}
                    />
                    <Product
                        id={Date.parse(new Date())}
                        title={'제품4'}
                        price={1000}
                        image={`https://picsum.photos/id/${Math.floor(Math.random() * 101)}/300/300`}
                        rating={Math.floor(Math.random() * 5 + 1)}
                    />
                    <Product
                        id={Date.parse(new Date())}
                        title={'제품5'}
                        price={1000}
                        image={`https://picsum.photos/id/${Math.floor(Math.random() * 101)}/300/300`}
                        rating={Math.floor(Math.random() * 5 + 1)}
                    />
                </div>
                <div className='home_row'>
                    {/* 상품 */}
                    <Product
                        id={Date.parse(new Date())}
                        title={'제품6'}
                        price={1000}
                        image={`https://picsum.photos/id/${Math.floor(Math.random() * 101)}/300/300`}
                        rating={Math.floor(Math.random() * 5 + 1)}
                    />
                </div>

            </div>
        </div>
    )
}

export default Home