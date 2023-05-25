import { Toast } from 'vant';
import i18n from '@/locales';
const { t } = i18n.global;
import { ElMessage } from 'element-plus'

const copy = (val: string) => {
  let input: HTMLInputElement = document.createElement('input');
  input.value = val;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
  ElMessage({
    showClose: true,
    message: 'Oops, this is a error message.',
    type: 'success',
  })
  // Notify({ type: 'success', message: '复制成功' });
  // Toast.success({ message: t('my.Copy_succeeded'), duration: 1000 });
  // alert('复制成功');
};

export { copy };
