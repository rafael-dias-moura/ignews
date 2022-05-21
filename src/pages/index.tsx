
import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { SubscribeButton } from "../components/SubscribeButton"
import { stripe } from "../services/stripe"
import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId:string;
    amount: number;
  }
}

export default function Home({product}) {
  return (
    <>
      <Head>
        <title>Home | ignews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world. </h1>
          <p>
            Get access to all the publications<br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <Image src="/images/avatar.svg" 
        alt="Girl coding"
        width={500}
        height={500} 
        
         />
      </main>
    </> 
)
}

export const getStaticProps: GetStaticProps = async () => {//chamada a api
  const price = await stripe.prices.retrieve('price_1L1tSaBSMnniMi4n0jCjzVX2', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }
  
  return {
     props: {
       product,
     },
     revalidate: 60 * 60 *24,//24hours
    }
}