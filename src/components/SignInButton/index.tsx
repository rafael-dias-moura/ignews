
import styles from './styles.module.scss'
import { FaGithub } from "react-icons/fa"
import { FiX }from 'react-icons/fi'
import { signIn, useSession } from 'next-auth/react'

export function SignInButton () {
    const { data: session } = useSession()
    console.log('session :>> ', session)
    
    return session ? (
        <button type="button"
        className={styles.signInButton}>
            <FaGithub color="#04d361"/>
            Rafael dias
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button type="button"
        className={styles.signInButton}
        onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417"/>
            Sign in with Github
        </button>
    )
}