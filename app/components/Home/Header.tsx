import { 
    SearchOutlined, 
    ShoppingCartOutlined,
    MenuOutlined
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { NextPage } from 'next';
import { Suspense, useId } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLocale } from '@/redux/slices/localeSlice';
import { useTranslation } from 'react-i18next';
import { showToastMessage } from '@/redux/slices/appSettingSlice';
import MainLayout from '@/layouts/MainLayout';
import Select from 'react-select';
import LoadingSpinner from '../LoadingSpinner';
import { suppressText } from '@/constants/*';
import { useSession, signIn, signOut } from 'next-auth/react';
import { isNull } from 'lodash';

interface Languages {
    label: string;
    value: string;
  }
  
const Header: NextPage = () => {
    const { locale: {isRTL} } = useAppSelector(state => state);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const languages: Languages[] = [
        { label: "English", value: "en" },
        { label: "العربية", value: "ar" }
    ];
    const session = useSession();
    console.log({session})
    const handleChangeLang = async (locale: string) => {
        console.log({locale, locale2: router.locale})
        if (locale !== router.locale) {
          await router
            .push(router.pathname, router.asPath, {
              locale,
              scroll: false,
            })
            .then(() => dispatch(setLocale(locale)))
            .then(() => 
              dispatch(
                showToastMessage({
                  content: `language_changed_successfully`,
                  type: `info`,
                })
              )
            )
            
        }
      };

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <MainLayout>
                <header >
                    <div>
                        <div 
                            className="xs:flex-column sm:flex items-center bg-amazon_blue p-1 py-2 flex-grow px-5"
                        >
                            <div className="flex justify-center mt-2 items-center flex-grow sm:flex-grow-0">
                                <Image
                                    src={'https://links.papareact.com/f90'}
                                    width={100}
                                    height={20}
                                    alt='logo'
                                    className="cursor-pointer object-contain mt-2 me-2"
                                />
                            </div>
                            <div 
                                className="bg-white flex justify-between flex-grow flex-shrink h-10 mx-2 rounded-md"
                            >
                                <input type="text" className="bg-transparent flex-grow outline-none p-2  border-0" />
                                <div 
                                    className={`bg-yellow-300 p-2 flex items-center border-0 hover:bg-yellow-500 cursor-pointer 
                                    ${isRTL ? 'rounded-l-md': 'rounded-r-md'}`}
                                >
                                    <SearchOutlined />
                                </div>
                            </div>
                            <div className="text-white xs:text-xs flex items-end justify-center space-x-4 whitespace-nowrap">
                                <div className="text-amazon_blue pe-2 z-20">
                                    <Select 
                                        instanceId={useId()}
                                        options={languages} 
                                        defaultValue={ languages.filter((l) => l.value === router.locale)}
                                        onChange={(e: any) => handleChangeLang(e.value)} 
                                        styles={{
                                            control: (baseStyles) => ({
                                            ...baseStyles,
                                            backgroundColor: 'text-amazon_blue !important',
                                            boxShadow: "none",
                                            }),
                                            option: (baseStyles) => ({
                                                ...baseStyles,
                                                backgroundColor: "#232F3E"
                                            }),
                                        }}
                                        formatOptionLabel={(option) => (
                                            <div className="text-white border-0 cursor-pointer p-0 m-0">{option.label}</div>
                                        )}
                                        components={{
                                            IndicatorSeparator: () => null
                                        }}
                                    />
                                    </div>
                                <button onClick={isNull(session.data) ? () => signIn() : () => signOut()}>
                                    <p suppressHydrationWarning={suppressText}>
                                        {session?.data?.user?.name ? `${t('hello')} ${session?.data?.user?.name}` : t('hello_sign_up')}
                                    </p>
                                    <p className="font-semibold" suppressHydrationWarning={suppressText}>{t('account_lists')}</p>
                                </button>
                                <Link href={'/'}>
                                    <p suppressHydrationWarning={suppressText}>{t('orders')}</p>
                                </Link>
                                <div className="link flex">
                                    <div className="flex pe-2">
                                        <ShoppingCartOutlined className="text-white text-3xl" />
                                        <p className="text-yellow-500">{0}</p>
                                    </div>
                                    <p className="hidden sm:block" suppressHydrationWarning={suppressText}>{t('cart')}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center bg-amazon_blue-light capitalize text-white px-5 py-2 font-semibold space-x-5">
                                <Link href={'/'} className="flex space-x-4">
                                    <MenuOutlined />
                                    <p suppressHydrationWarning={suppressText}>{t('all')}</p>
                                </Link>
                                <Link href={'/'} suppressHydrationWarning={suppressText}>
                                    {t('today_s_deals')}
                                </Link>
                                <Link href={'/'} suppressHydrationWarning={suppressText}>
                                    {t('mobile_phones')}
                                </Link>
                                <Link href={'/'} suppressHydrationWarning={suppressText}>
                                    {t('help')}
                                </Link>
                                <Link href={'/'} suppressHydrationWarning={suppressText}>
                                    {t('electronics')}
                                </Link>
                                <Link href={'/'} suppressHydrationWarning={suppressText}>
                                    {t('appliances')}
                                </Link>
                                <Link href={'/'} suppressHydrationWarning={suppressText}>
                                    {t('prime')}
                                </Link>
                                <Link href={'/'} suppressHydrationWarning={suppressText}>
                                    {t('fashion')}
                                </Link>
                                <Link href={'/'} suppressHydrationWarning={suppressText}>
                                    {t('home')}
                                </Link>
                                <Link href={'/'} suppressHydrationWarning={suppressText}>
                                    {t('grocery')}
                                </Link>
                                <Link href={'/'} suppressHydrationWarning={suppressText}>
                                    {t('video_games')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
            </MainLayout>
       </Suspense>
    )
}

export default Header;