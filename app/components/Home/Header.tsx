import { 
    SearchOutlined, 
    ShoppingCartOutlined,
    MenuOutlined
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { NextPage } from 'next';
import { Suspense, useId, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLocale } from '@/redux/slices/localeSlice';
import { useTranslation } from 'react-i18next';
import { showToastMessage } from '@/redux/slices/appSettingSlice';
import MainLayout from '@/layouts/MainLayout';
import Select from 'react-select';
import LoadingSpinner from '../LoadingSpinner';
import { appLinks, suppressText } from '@/constants/*';
import { useSession, signIn, signOut } from 'next-auth/react';
import { isNull } from 'lodash';
import NavTabs from './NavTabs';

interface Languages {
    label: string;
    value: string;
  }
  
const Header: NextPage = () => {
    const { locale: {isRTL} } = useAppSelector(state => state);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const languages: Languages[] = [
        { label: "English", value: "en" },
        { label: "العربية", value: "ar" }
    ];
    const session = useSession();
    const { cart } = useAppSelector((state) => state);
    console.log('cart items', cart);
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
    const MenuIcon = () => {
        return (
            <li>
                <Link href={'/'} className="flex space-x-4">
                    <MenuOutlined />
                    <p suppressHydrationWarning={suppressText}>{t('all')}</p>
                </Link>
            </li>
        )
    }
    return (
        <Suspense fallback={<LoadingSpinner />}>
                <header >
                    <div>
                        <div 
                            className="xs:flex-column md:flex items-center bg-amazon_blue p-1 py-2 flex-grow px-5"
                        >
                            <Link href={appLinks.home.path} className="flex justify-center mt-2 items-center flex-grow sm:flex-grow-0">
                                <Image
                                    src={'https://links.papareact.com/f90'}
                                    width={100}
                                    height={20}
                                    alt='logo'
                                    className="cursor-pointer object-contain mt-2 me-2"
                                />
                            </Link>
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
                                <Link href={`${appLinks.review.path}`}>
                                    <p suppressHydrationWarning={suppressText}>{t('orders')}</p>
                                </Link>
                                <Link href={appLinks.cart.path} className="link flex">
                                    <div className="flex pe-2">
                                        <ShoppingCartOutlined className="text-white text-3xl" />
                                        <p className="text-yellow-500">{cart.items.length}</p>
                                    </div>
                                    <p className="hidden sm:block" suppressHydrationWarning={suppressText}>{t('cart')}</p>
                                </Link>
                            </div>
                        </div>
                        <div>
                        <div className="flex items-center bg-amazon_blue-light capitalize text-white px-5 py-2 font-semibold space-x-5">
                            <nav>
                                <section className="MOBILE-MENU flex lg:hidden">
                                <div
                                    className="HAMBURGER-ICON space-y-2"
                                    onClick={() => setIsNavOpen((prev) => !prev)}
                                >
                                    <MenuOutlined className="cursor-pointer block lg:hidden" />
                                </div>

                                <div className={isNavOpen ? "showMenuNav bg-amazon_blue-light w-[75%]" : "hideMenuNav"}>
                                    <div
                                    className="absolute top-0 right-0 px-8 py-8 cursor-pointer"
                                    onClick={() => setIsNavOpen(false)}
                                    >
                                    <svg
                                        className="h-8 w-8 text-gray-600"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                    </div>
                                    <NavTabs className="ps-12 py-10 min-h-[250px] space-y-5"/>
                                </div>
                                </section>
                                <NavTabs 
                                    className="DESKTOP-MENU hidden space-x-8 lg:flex"
                                    children={<MenuIcon/>}
                                />
                            </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 50;
      }
    `}</style>
    </div>
                        </div>
                    </div>
                </header>
       </Suspense>
    )
}

export default Header;