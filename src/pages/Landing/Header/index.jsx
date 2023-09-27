import React, { useState, useEffect, useRef } from 'react';
import cls from './style.module.scss'
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import logo_v1 from '@images/icons/logo_v1.svg';
import logo_v2 from '@images/icons/logo_v2.svg';
import { Navigation, SelectTheme } from '@components';

const Header = ({ className = null }) => {
	const { t, i18n } = useTranslation();
	const theme = useSelector(state => state.theme.value);
	const logo = (theme === 'dark') ? logo_v1 : logo_v2;
	const headerRef = useRef(null);
	const [styledBg, setStyledBg] = useState(false);
	const [visible, setVisible] = useState(true);
	const [scrollTopValue, setScrollTopValue] = useState(0);
	const [hamburgerActive, setHamburgerActive] = useState(false);


	const isIOS = function () {
		var iosQuirkPresent = function () {
			var audio = new Audio();

			audio.volume = 0.5;
			return audio.volume === 1;   // volume cannot be changed from "1" on iOS 12 and below
		};

		var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
		var isAppleDevice = navigator.userAgent.includes('Macintosh');
		var isTouchScreen = navigator.maxTouchPoints >= 1;   // true for iOS 13 (and hopefully beyond)

		return isIOS || (isAppleDevice && (isTouchScreen || iosQuirkPresent()));
	}


	const closeNavMenu = () => setHamburgerActive(false);
	const changeLang = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
		if (isIOS()) window.location.reload(true);
	};

	const checkScroll = (e) => {
		// let scrollTop = e.target.scrollTop;
		let scrollTop = window.pageYOffset;
		(scrollTop > 60) ? setStyledBg(true) : setStyledBg(false);

		// setScrollTopValue(prev => {
		// 	(scrollTop > prev) ? setVisible(true) : setVisible(false);
		// 	return scrollTop;
		// })
	};


	useEffect(() => {
		// const wrap = document.querySelector('#wrapper');
		window.addEventListener('scroll', checkScroll)
		document.addEventListener('click', closeNavMenu)

		return () => {
			window.removeEventListener('scroll', checkScroll)
			document.removeEventListener('click', closeNavMenu)
		}
	}, [])



	return (<>
		<header
			className={classNames([cls.wrap, className])}
			data-theme={theme}
			data-styled={styledBg}
			data-visible={visible}
			ref={headerRef}
			onClick={e => e.stopPropagation()}
		>
			<div className={classNames(["container", cls.container])}>
				<a href='' className={cls.logo}><img src={logo} /></a>
				<div
					className={cls.nav}
					data-theme={theme}
					data-open={hamburgerActive}
				>
					<Navigation closeNavMenu={closeNavMenu} />
				</div>
				<div className={cls.block}>
					<SelectTheme />
					<div className={cls.lang} onClick={changeLang}>{i18n.language}</div>
				</div>
				<div
					className={cls.hamburger}
					data-active={hamburgerActive}
					data-theme={theme}
					onClick={e => setHamburgerActive(prev => !prev)}
				> <div className={cls.hamburger__line} />	</div>
			</div>
		</header>
	</>);
}

export default Header;