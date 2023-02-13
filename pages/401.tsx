import OffLineWidget from '@/components/widgets/OfflineWidget';
import { useTranslation } from 'react-i18next';

export default function Custom401() {
  const { t } = useTranslation();
  return (
      <OffLineWidget
        message={t('network_is_not_available_please_check_your_internet')}
      />
  );
}
