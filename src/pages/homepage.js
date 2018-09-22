import React, { Component } from 'react';

import NamVoImage from './../assets/img/namvh.jpg';
import StartupLifeImage from './../assets/img/startup_life.svg';
import TakingNotesImage from './../assets/img/taking_notes.svg';
import './../assets/css/pages/homepage.css';

export default class Homepage extends Component
{
    render() {
        return (
            <div className="homepage">

                <div className="homepage__cover">
                    <div className="container">
                        <div className="jumbotron shadow">
                            <h1 className="display-4">Nam Vo's Blog</h1>
                            <p className="lead">Nhật ký cá nhân và chia sẻ chuyện nghề nghiệp</p>
                        </div>
                    </div>
                </div>

                <div className="homepage__overview">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 py-4">
                                <h2 className="homepage__title">Xin chào</h2>
                                <p>
                                    Kể từ khi bắt đầu cuộc hành trình với vai trò một front-end developer, tôi đã được tiếp xúc với nhiều khách hàng, hợp tác với nhiều bạn trẻ tài năng phối hợp với các cơ quan nhà nước để làm ra sản phẩm phục vụ người dân tại Saigon, Việt Nam.
                                </p>
                                <p>
                                    Hãy liên hệ tôi nếu bạn có bất kỳ điều chi cần trao đổi!
                                </p>
                            </div>
                            <div className="col-lg-6 text-center">
                                <img src={ NamVoImage } alt="Nam Vo" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="homepage__blog">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <img className="img-fluid" src={ StartupLifeImage } alt="Startup Life" />
                            </div>
                            <div className="col-lg-6">
                                <h2 className="homepage__title mt-4">Nhật ký</h2>
                                <ul className="homepage__list list">
                                    <li>
                                        <div className="item">
                                            <a className="item__title" href="#">Chuyện nhân sự</a>
                                            <span className="item__time">Ngày 14 tháng 8 năm 2018</span>
                                            <p className="item__description">Trong lúc dọn máy tính, mình muốn lưu lại một chút về bài viết "HR Du Hý" của một bạn HR đã chia sẻ chuyện nhân sự</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item">
                                            <a className="item__title" href="#">Chuyện nhân sự</a>
                                            <span className="item__time">Ngày 14 tháng 8 năm 2018</span>
                                            <p className="item__description">Trong lúc dọn máy tính, mình muốn lưu lại một chút về bài viết "HR Du Hý" của một bạn HR đã chia sẻ chuyện nhân sự</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item">
                                            <a className="item__title" href="#">Chuyện nhân sự</a>
                                            <span className="item__time">Ngày 14 tháng 8 năm 2018</span>
                                            <p className="item__description">Trong lúc dọn máy tính, mình muốn lưu lại một chút về bài viết "HR Du Hý" của một bạn HR đã chia sẻ chuyện nhân sự</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item">
                                            <a className="item__title" href="#">Chuyện nhân sự</a>
                                            <span className="item__time">Ngày 14 tháng 8 năm 2018</span>
                                            <p className="item__description">Trong lúc dọn máy tính, mình muốn lưu lại một chút về bài viết "HR Du Hý" của một bạn HR đã chia sẻ chuyện nhân sự</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item">
                                            <a className="item__title" href="#">Chuyện nhân sự</a>
                                            <span className="item__time">Ngày 14 tháng 8 năm 2018</span>
                                            <p className="item__description">Trong lúc dọn máy tính, mình muốn lưu lại một chút về bài viết "HR Du Hý" của một bạn HR đã chia sẻ chuyện nhân sự</p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="text-right">
                                    <a className="more" href="#">&raquo; Xem thêm</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="homepage__tutorials">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h2 className="homepage__title">Chuyện ngành</h2>
                                <ul className="homepage__list list">
                                    <li>
                                        <div className="item">
                                            <a className="item__title" href="#">Chuyện nhân sự</a>
                                            <span className="item__time">Ngày 14 tháng 8 năm 2018</span>
                                            <p className="item__description">Trong lúc dọn máy tính, mình muốn lưu lại một chút về bài viết "HR Du Hý" của một bạn HR đã chia sẻ chuyện nhân sự</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item">
                                            <a className="item__title" href="#">Chuyện nhân sự</a>
                                            <span className="item__time">Ngày 14 tháng 8 năm 2018</span>
                                            <p className="item__description">Trong lúc dọn máy tính, mình muốn lưu lại một chút về bài viết "HR Du Hý" của một bạn HR đã chia sẻ chuyện nhân sự</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item">
                                            <a className="item__title" href="#">Chuyện nhân sự</a>
                                            <span className="item__time">Ngày 14 tháng 8 năm 2018</span>
                                            <p className="item__description">Trong lúc dọn máy tính, mình muốn lưu lại một chút về bài viết "HR Du Hý" của một bạn HR đã chia sẻ chuyện nhân sự</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item">
                                            <a className="item__title" href="#">Chuyện nhân sự</a>
                                            <span className="item__time">Ngày 14 tháng 8 năm 2018</span>
                                            <p className="item__description">Trong lúc dọn máy tính, mình muốn lưu lại một chút về bài viết "HR Du Hý" của một bạn HR đã chia sẻ chuyện nhân sự</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="item">
                                            <a className="item__title" href="#">Chuyện nhân sự</a>
                                            <span className="item__time">Ngày 14 tháng 8 năm 2018</span>
                                            <p className="item__description">Trong lúc dọn máy tính, mình muốn lưu lại một chút về bài viết "HR Du Hý" của một bạn HR đã chia sẻ chuyện nhân sự</p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="text-right">
                                    <a className="more" href="#">&raquo; Xem thêm</a>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-4">
                                <img className="img-fluid" src={ TakingNotesImage } alt="Taking Notes" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
