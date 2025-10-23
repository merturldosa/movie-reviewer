import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import styles from './AuthModal.module.css';

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useUser();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력하세요';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일을 입력하세요';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력하세요';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
    }

    if (!isLoginMode) {
      if (!formData.userName) {
        newErrors.userName = '사용자 이름을 입력하세요';
      } else if (formData.userName.length < 3) {
        newErrors.userName = '사용자 이름은 최소 3자 이상이어야 합니다';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = '비밀번호 확인을 입력하세요';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      if (isLoginMode) {
        const result = await login({
          email: formData.email,
          password: formData.password,
        });

        if (result.success) {
          resetForm();
          onClose();
        } else {
          setErrors({ general: result.error });
        }
      } else {
        const result = await register({
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
        });

        if (result.success) {
          resetForm();
          onClose();
        } else {
          setErrors({ general: result.error });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({ general: '오류가 발생했습니다. 다시 시도해주세요.' });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      userName: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isLoginMode ? '로그인' : '회원가입'}
      size="small"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        {errors.general && (
          <div className={styles.generalError}>{errors.general}</div>
        )}

        {!isLoginMode && (
          <Input
            label="사용자 이름"
            value={formData.userName}
            onChange={(e) => handleChange('userName', e.target.value)}
            placeholder="사용자 이름을 입력하세요"
            error={errors.userName}
            required
          />
        )}

        <Input
          label="이메일"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="이메일을 입력하세요"
          error={errors.email}
          required
        />

        <Input
          label="비밀번호"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="비밀번호를 입력하세요"
          error={errors.password}
          required
        />

        {!isLoginMode && (
          <Input
            label="비밀번호 확인"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            error={errors.confirmPassword}
            required
          />
        )}

        <div className={styles.actions}>
          <Button type="submit" variant="primary" disabled={submitting} fullWidth>
            {submitting
              ? '처리 중...'
              : isLoginMode
              ? '로그인'
              : '회원가입'}
          </Button>
        </div>

        <div className={styles.switchMode}>
          <span>
            {isLoginMode ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          </span>
          <button type="button" onClick={switchMode} className={styles.switchButton}>
            {isLoginMode ? '회원가입' : '로그인'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AuthModal;
