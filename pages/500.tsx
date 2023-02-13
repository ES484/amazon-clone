import OffLineWidget from '@/components/widgets/OfflineWidget';
import { useTranslation } from 'react-i18next';

export default function Custom500() {
  const { t } = useTranslation();
  return (
      <OffLineWidget message={t('500-server_side_error_occurred')} />
  );
}
