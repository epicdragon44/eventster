import styles from "../styles/styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const enum Route {
    Home = "/",
    About = "/about",
    Chat = "/chat",
}

export const Heading = (props: {}) => {
    const router = useRouter();
    return (
        <div className={styles.description}>
            <p className='flex flex-row gap-4 px-12'>
                <span
                    className={
                        router.pathname === Route.Home
                            ? "font-bold underline"
                            : ""
                    }
                >
                    <Link href={Route.Home}>Home</Link>
                </span>
                <span
                    className={
                        router.pathname === Route.About
                            ? "font-bold underline"
                            : ""
                    }
                >
                    <Link href={Route.About}>About</Link>
                </span>
                <span
                    className={
                        router.pathname === Route.Chat
                            ? "font-bold underline"
                            : ""
                    }
                >
                    <Link href={Route.Chat}>Chat</Link>
                </span>
            </p>
            <div>
                <a
                    href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <Image
                        src='/eventster.png'
                        alt='Vercel Logo'
                        className={styles.vercelLogo}
                        width={200}
                        height={50}
                        priority
                    />
                </a>
            </div>
        </div>
    );
};
