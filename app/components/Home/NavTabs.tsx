import { suppressText } from '@/constants/*';
import Link from 'next/link';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    className: string,
    children?: JSX.Element
}
const NavTabs: FC<Props> = ({ className, children }) => {
    const { t } = useTranslation();
    return (
        <ul className={className}>
            {children}
            <li>
                <Link href={'/'} className="flex space-x-4">
                    <p suppressHydrationWarning={suppressText}>{t('all')}</p>
                </Link>
            </li>
            <li>
                <Link href={'/'} suppressHydrationWarning={suppressText}>
                    {t('today_s_deals')}
                </Link>
            </li>
            <li>
                <Link href={'/'} suppressHydrationWarning={suppressText}>
                    {t('mobile_phones')}
                </Link>
            </li>
            <li>
                <Link href={'/'} suppressHydrationWarning={suppressText}>
                    {t('help')}
                </Link>
            </li>
            <li>
                <Link href={'/'} suppressHydrationWarning={suppressText}>
                    {t('electronics')}
                </Link>
            </li>
            <li>
                <Link href={'/'} suppressHydrationWarning={suppressText}>
                    {t('appliances')}
                </Link>
            </li>
            <li>
                <Link href={'/'} suppressHydrationWarning={suppressText}>
                    {t('prime')}
                </Link>
            </li>
            <li>
                <Link href={'/'} suppressHydrationWarning={suppressText}>
                    {t('fashion')}
                </Link>
            </li>
            <li>
                <Link href={'/'} suppressHydrationWarning={suppressText}>
                    {t('home')}
                </Link>
            </li>
            <li>
                <Link href={'/'} suppressHydrationWarning={suppressText}>
                    {t('grocery')}
                </Link>
            </li>
            <li>
                <Link href={'/'} suppressHydrationWarning={suppressText}>
                    {t('video_games')}
                </Link>
            </li>
        </ul>
    )
}

export default NavTabs;