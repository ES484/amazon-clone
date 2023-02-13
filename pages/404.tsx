import OffLineWidget from '@/components/widgets/OfflineWidget';
import { useTranslation } from 'react-i18next';
import error404 from '@/appImages/404_error.jpg';

export default function Custom404() {
  const { t } = useTranslation();
  return (
      <OffLineWidget img={`${error404.src}`} message={t(`not_found`)} />
  );
}
