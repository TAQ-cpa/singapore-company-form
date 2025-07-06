'use client';

import { useState } from 'react';
import { Send, Building2, User, FileText, Calendar, DollarSign } from 'lucide-react';

export default function SingaporeForm() {
  const [formData, setFormData] = useState({
    // 基本情報
    companyName1: '',
    companyName2: '',
    companyName3: '',
    establishmentDate: '',
    registeredAddress: '2 Kallang Avenue 07-25 CT HUB Singapore 339407',
    currency: 'SGD',
    totalShares: '1',
    pricePerShare: '1',
    fiscalYearEnd: '',
    businessCode1: '',
    businessCode2: '',
    
    // 役員情報
    directors: [{
      nameEn: '',
      addressEn: '',
      passportOrFin: '',
      nationality: '',
      birthDate: '',
      phoneFixed: '',
      phoneMobile: '',
      email: '',
      useAlternateAddress: false
    }],
    
    // 株主情報
    shareholders: [{
      shares: '1',
      isIndividual: true,
      // 個人株主
      nameEn: '',
      addressEn: '',
      passportOrFin: '',
      nationality: '',
      birthDate: '',
      phoneFixed: '',
      phoneMobile: '',
      email: '',
      // 法人株主
      companyNameEn: '',
      headOfficeAddress: '',
      headOfficeCountry: '',
      signatoryName: '',
      signatoryAddress: '',
      authorizedPersonName: '',
      authorizedPersonPosition: ''
    }]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDirectorChange = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      directors: prev.directors.map((director, i) => 
        i === index ? { ...director, [field]: value } : director
      )
    }));
  };

  const handleShareholderChange = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      shareholders: prev.shareholders.map((shareholder, i) => 
        i === index ? { ...shareholder, [field]: value } : shareholder
      )
    }));
  };

  const addDirector = () => {
    setFormData(prev => ({
      ...prev,
      directors: [...prev.directors, {
        nameEn: '',
        addressEn: '',
        passportOrFin: '',
        nationality: '',
        birthDate: '',
        phoneFixed: '',
        phoneMobile: '',
        email: '',
        useAlternateAddress: false
      }]
    }));
  };

  const addShareholder = () => {
    setFormData(prev => ({
      ...prev,
      shareholders: [...prev.shareholders, {
        shares: '',
        isIndividual: true,
        nameEn: '',
        addressEn: '',
        passportOrFin: '',
        nationality: '',
        birthDate: '',
        phoneFixed: '',
        phoneMobile: '',
        email: '',
        companyNameEn: '',
        headOfficeAddress: '',
        headOfficeCountry: '',
        signatoryName: '',
        signatoryAddress: '',
        authorizedPersonName: '',
        authorizedPersonPosition: ''
      }]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // GAS APIのURLをここに設定（後で更新）
      const gasApiUrl = 'YOUR_GAS_API_URL_HERE';
      
      const response = await fetch(gasApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString()
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        // フォームリセット
        setFormData({
          companyName1: '',
          companyName2: '',
          companyName3: '',
          establishmentDate: '',
          registeredAddress: '2 Kallang Avenue 07-25 CT HUB Singapore 339407',
          currency: 'SGD',
          totalShares: '1',
          pricePerShare: '1',
          fiscalYearEnd: '',
          businessCode1: '',
          businessCode2: '',
          directors: [{
            nameEn: '',
            addressEn: '',
            passportOrFin: '',
            nationality: '',
            birthDate: '',
            phoneFixed: '',
            phoneMobile: '',
            email: '',
            useAlternateAddress: false
          }],
          shareholders: [{
            shares: '1',
            isIndividual: true,
            nameEn: '',
            addressEn: '',
            passportOrFin: '',
            nationality: '',
            birthDate: '',
            phoneFixed: '',
            phoneMobile: '',
            email: '',
            companyNameEn: '',
            headOfficeAddress: '',
            headOfficeCountry: '',
            signatoryName: '',
            signatoryAddress: '',
            authorizedPersonName: '',
            authorizedPersonPosition: ''
          }]
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* ヘッダー */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Building2 size={32} />
              <h1 className="text-3xl font-bold">シンガポール法人設立質問書</h1>
            </div>
            <p className="text-blue-100 text-lg">
              法人設立に必要な情報をご入力ください
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* 基本情報セクション */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-blue-100">
                <FileText className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-800">基本情報</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    社名 第1候補 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName1}
                    onChange={(e) => handleInputChange('companyName1', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Company Name Pte. Ltd."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    社名 第2候補
                  </label>
                  <input
                    type="text"
                    value={formData.companyName2}
                    onChange={(e) => handleInputChange('companyName2', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Alternative Name Pte. Ltd."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    社名 第3候補
                  </label>
                  <input
                    type="text"
                    value={formData.companyName3}
                    onChange={(e) => handleInputChange('companyName3', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Another Name Pte. Ltd."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    法人設立希望日
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      value={formData.establishmentDate}
                      onChange={(e) => handleInputChange('establishmentDate', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最初の決算日
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      value={formData.fiscalYearEnd}
                      onChange={(e) => handleInputChange('fiscalYearEnd', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  法人登記住所
                </label>
                <input
                  type="text"
                  value={formData.registeredAddress}
                  onChange={(e) => handleInputChange('registeredAddress', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  readOnly
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    資本金の通貨 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      required
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="SGD">SGD</option>
                      <option value="USD">USD</option>
                      <option value="JPY">JPY</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    設立時の株式発行総数 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.totalShares}
                    onChange={(e) => handleInputChange('totalShares', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    1株あたりの払込金額 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerShare}
                    onChange={(e) => handleInputChange('pricePerShare', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    min="0.01"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    事業内容1（必須） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessCode1}
                    onChange={(e) => handleInputChange('businessCode1', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="事業コードを入力"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    事業内容2（任意）
                  </label>
                  <input
                    type="text"
                    value={formData.businessCode2}
                    onChange={(e) => handleInputChange('businessCode2', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="事業コードを入力"
                  />
                </div>
              </div>
            </section>

            {/* 取締役情報セクション */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b-2 border-blue-100">
                <div className="flex items-center gap-3">
                  <User className="text-blue-600" size={24} />
                  <h2 className="text-2xl font-semibold text-gray-800">取締役情報</h2>
                </div>
                <button
                  type="button"
                  onClick={addDirector}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  取締役を追加
                </button>
              </div>

              {formData.directors.map((director, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">役員 {index + 1}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        氏名（英語表記） <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={director.nameEn}
                        onChange={(e) => handleDirectorChange(index, 'nameEn', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Full Name in English"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passport No または FIN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={director.passportOrFin}
                        onChange={(e) => handleDirectorChange(index, 'passportOrFin', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Passport Number or FIN"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      住所（英語表記） <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={director.addressEn}
                      onChange={(e) => handleDirectorChange(index, 'addressEn', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Full Address in English"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        国籍 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={director.nationality}
                        onChange={(e) => handleDirectorChange(index, 'nationality', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Nationality"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        生年月日 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={director.birthDate}
                        onChange={(e) => handleDirectorChange(index, 'birthDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emailアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={director.email}
                        onChange={(e) => handleDirectorChange(index, 'email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        電話番号（固定）
                      </label>
                      <input
                        type="tel"
                        value={director.phoneFixed}
                        onChange={(e) => handleDirectorChange(index, 'phoneFixed', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="+65-XXXX-XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        電話番号（携帯）
                      </label>
                      <input
                        type="tel"
                        value={director.phoneMobile}
                        onChange={(e) => handleDirectorChange(index, 'phoneMobile', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="+65-XXXX-XXXX"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`alt-address-${index}`}
                      checked={director.useAlternateAddress}
                      onChange={(e) => handleDirectorChange(index, 'useAlternateAddress', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`alt-address-${index}`} className="text-sm text-gray-700">
                      Alternate Addressの使用
                    </label>
                  </div>
                </div>
              ))}
            </section>

            {/* 株主情報セクション */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b-2 border-blue-100">
                <div className="flex items-center gap-3">
                  <Building2 className="text-blue-600" size={24} />
                  <h2 className="text-2xl font-semibold text-gray-800">株主情報</h2>
                </div>
                <button
                  type="button"
                  onClick={addShareholder}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  株主を追加
                </button>
              </div>

              {formData.shareholders.map((shareholder, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-800">株主 {index + 1}</h3>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`shareholder-type-${index}`}
                          checked={shareholder.isIndividual}
                          onChange={() => handleShareholderChange(index, 'isIndividual', true)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">個人株主</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`shareholder-type-${index}`}
                          checked={!shareholder.isIndividual}
                          onChange={() => handleShareholderChange(index, 'isIndividual', false)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">法人株主</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      引受株式数 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={shareholder.shares}
                      onChange={(e) => handleShareholderChange(index, 'shares', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      min="1"
                    />
                  </div>

                  {shareholder.isIndividual ? (
                    // 個人株主フィールド
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            氏名（英語表記） <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={shareholder.nameEn}
                            onChange={(e) => handleShareholderChange(index, 'nameEn', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Full Name in English"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Passport No または FIN <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={shareholder.passportOrFin}
                            onChange={(e) => handleShareholderChange(index, 'passportOrFin', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Passport Number or FIN"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          住所（英語表記） <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={shareholder.addressEn}
                          onChange={(e) => handleShareholderChange(index, 'addressEn', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Full Address in English"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            国籍 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={shareholder.nationality}
                            onChange={(e) => handleShareholderChange(index, 'nationality', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Nationality"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            生年月日 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            required
                            value={shareholder.birthDate}
                            onChange={(e) => handleShareholderChange(index, 'birthDate', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Emailアドレス <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={shareholder.email}
                            onChange={(e) => handleShareholderChange(index, 'email', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            電話番号（固定）
                          </label>
                          <input
                            type="tel"
                            value={shareholder.phoneFixed}
                            onChange={(e) => handleShareholderChange(index, 'phoneFixed', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="+65-XXXX-XXXX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            電話番号（携帯） <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={shareholder.phoneMobile}
                            onChange={(e) => handleShareholderChange(index, 'phoneMobile', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="+65-XXXX-XXXX"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // 法人株主フィールド
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            社名（英語表記） <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={shareholder.companyNameEn}
                            onChange={(e) => handleShareholderChange(index, 'companyNameEn', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            本店所在国 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={shareholder.headOfficeCountry}
                            onChange={(e) => handleShareholderChange(index, 'headOfficeCountry', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Country"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          本店住所（英語表記） <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={shareholder.headOfficeAddress}
                          onChange={(e) => handleShareholderChange(index, 'headOfficeAddress', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Head Office Address"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            署名者氏名 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={shareholder.signatoryName}
                            onChange={(e) => handleShareholderChange(index, 'signatoryName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Signatory Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            署名者住所 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={shareholder.signatoryAddress}
                            onChange={(e) => handleShareholderChange(index, 'signatoryAddress', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Signatory Address"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            権限者氏名 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={shareholder.authorizedPersonName}
                            onChange={(e) => handleShareholderChange(index, 'authorizedPersonName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Authorized Person Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            権限者役職 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={shareholder.authorizedPersonPosition}
                            onChange={(e) => handleShareholderChange(index, 'authorizedPersonPosition', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Position"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* 送信ボタン */}
            <div className="flex justify-center pt-8">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl transition-all transform ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    送信中...
                  </>
                ) : (
                  <>
                    <Send size={24} />
                    質問書を送信
                  </>
                )}
              </button>
            </div>

            {/* ステータス表示 */}
            {submitStatus && (
              <div className={`text-center p-4 rounded-lg ${
                submitStatus === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {submitStatus === 'success' 
                  ? '✅ 質問書が正常に送信されました。ありがとうございます！'
                  : '❌ 送信中にエラーが発生しました。もう一度お試しください。'
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}